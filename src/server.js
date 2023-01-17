const express = require('express');
const cors = require('cors');
const morgan=require('morgan');
const dotenv = require('dotenv')

const app = express();

const conn = require('./service/db');

const mqtt = require('mqtt');
 
dotenv.config()

//Configuraciones
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2)
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.use((req,res,next)=>{
//    res.header('Access-Control-Allow-Origin','*');
//    next();
//});
app.use(cors(
    {
        origin:'*'
    }
));
 
//Nuestro primer WS Get
app.get('/', (req, res) => {    
    console.log(req)
    res.json(
        {
            "Title": "Ola mundo"
        }
    );
})

app.get('/test', (req, res)=>{
    
    console.log(req.headers)
    res.json(
        {
            "Title": "test"
        }
    );
})

const rutas = require('./routes/routes')
app.use('/api', rutas);
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

// // MQTT handler
const clientId = 'mqttjs_' + Math.random().toString(16).substring(2,8);

const host = 'ws://192.168.0.81:8083/mqtt';

const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    username: 'cliente1',
    password: 'public',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
        topic: 'ecopuntos',
        payload: 'Cerrada.!',
        qos: 0,
        retain: false
    },
}

console.log('mqtt client Listo');
const client = mqtt.connect(process.env.MQTT_URI, options)

client.on('error', (err) => {
    console.log('Error de conexion: ' , err);
    cliente.end();
});

client.on('reconnect' , () => {
    console.log('Reconectando...');
});


client.on('connect', () => {
    // console.log('Cliente Listo: ' , clientId);
    // Subscribe
    client.subscribe('inicioSesion', {qos: 0});
    client.subscribe('trash_update', {qos: 0})
});

//Publicando

// Recibiendo datos
client.on('message' , (topic, message, packet) => {
    if(topic==='inicioSesion'){
        // console.log('-------inicio sesion')
        // console.log('topic: ', topic)
        // console.log('message: ', message.toString())
        // console.log('packet: ', packet)
        // console.log('inicio sesion-------')
        const mensaje = message.toString()
        const data = JSON.parse(mensaje)
        if(data.codigo){
            console.log('fn inicioSesion: ', message.toString())
            client.publish('inicioSesion', JSON.stringify({data: 'loginValido'}))
        }
    }
    if(topic === 'trash_update'){        
        // console.log('-------trash_update')
        // console.log('topic: ', topic)
        // console.log('message: ', message.toString())
        // console.log('packet: ', packet)
        // console.log('trash_update-------')
        const mensaje = message.toString()
        const data = JSON.parse(mensaje)
        if(data.codigo && data.cantidad){
            // console.log(`usuario: ${data.codigo}, registro ${data.cantidad}u de basura`)
            conn.query('UPDATE estudiante SET puntos = puntos + ? WHERE codmatricula=?',
            [data.cantidad, data.codigo],(err,res, next)=>{
                if(err)
                    console.error(err);
                else{
                    console.log(res);
                }
            })
        }
    }
});
