const router = require('express').Router();
const controllers = require('../controller/estudiantes')

router.get('/', controllers.getAllEstudiantes);

router.post('/',controllers.AddEstudiante);

router.get('/:codigo',controllers.getEstudiante);

router.post('/validar',async (req,res)=>{
    let response = await controllers.validarEstudiante(req.body.codigo)
    console.log(response);
    return res.json(response);
});
router.post('/registrarBasura',async (req,res)=>{
    console.log(req.body);
    let response = await controllers.registrarBasura(req.body.codigo, req.body.cantBasura)
    console.log(response);
    return res.json(response);
});

module.exports = router;
