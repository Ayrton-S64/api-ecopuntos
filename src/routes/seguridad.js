var router = require('express').Router()
const morgan=require('morgan');
const jwt = require('jsonwebtoken')

router.use(morgan('dev'));

router.get('/',(req,res)=>{
    res.json({message:"estas conectado a la API. Recurso: Seguridad"})
})

router.post('/autenticate',(req,res)=>{
    const {usuario, password} = req.body
    console.log(req.body, usuario, password, process.env.KEY)

    if(usuario==='admin' && password==='1234'){
        const token = jwt.sign({
            nombre: 'admin',
            id: 1,
        }, process.env.KEY)
        res.json({
            Ok:true,
            mensaje: "Acceso concedido",
            token
        })
    }
})

module.exports = router