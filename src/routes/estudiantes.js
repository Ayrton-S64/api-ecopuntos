const router = require('express').Router();
const controllers = require('../controller/estudiantes')

router.get('/', controllers.getAllEstudiantes);

router.post('/',controllers.AddEstudiante);

router.get('/:codigo',controllers.getEstudiante);


module.exports = router;
