const router = require('express').Router();

var seguridad = require('./seguridad');
var estudiantes = require('./estudiantes');
var beneficios = require('./beneficios');

router.use('/seguridad', seguridad)
router.use('/estudiantes', estudiantes)
router.use('/recompensas', beneficios)

router.get('/',(req,res)=>{
    res.status(200).json({mensaje: 'Bienvenido a la api'})
})

module.exports = router