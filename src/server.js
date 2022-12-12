const express = require('express');
const app = express();
const morgan=require('morgan');
const dotenv = require('dotenv')

const mqtt = require('mqtt');
 
dotenv.config()

//Configuraciones
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2)
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
 
//Nuestro primer WS Get
app.get('/', (req, res) => {    
    console.log(req)
    res.json(
        {
            "Title": "Ola mundo"
        }
    );
})

const rutas = require('./routes/routes')
app.use('/api', rutas);
 
//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

// MQTT handler
const clientId = 'mqttjs_' + Math.random().toString(16).substring(2,8);

const host = 'ws://192.168.1.18:8093/mqtt';

const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
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
    console.log('Cliente Listo: ' , clientId);
    // Subscribe
    client.subscribe('inicioSesion', {qos: 0});
});

//Publicando
client.publish('inicioSesion', 'MENSAJE!!!...!', {qos: 0, retain: false});

// Recibiendo datos
client.on('message' , (topic, message, packet) => {
    console.log('-------inicio sesion')
    console.log('topic: ', topic)
    console.log('message: ', message)
    console.log('packet: ', packet)
    console.log('inicio sesion-------')
    if(topic==='inicioSesion'){
        console.log('fn inicioSesion: ', message.toString())
        client.publish('inicioSesion','loginValido', {qos: 0, retain: false})
    }

});

function loginUser(codigoEstudiante){
    client.publish('inicioSesion', `${codigoEstudiante}`, {qos: 0, retain: false});
}