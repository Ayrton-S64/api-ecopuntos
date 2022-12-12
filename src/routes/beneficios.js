const router = require('express').Router();
const controllers = require('../controller/beneficios')

router.get('/', controllers.getAllBeneficios);

router.post('/',controllers.AddBeneficio);

router.get('/:id',controllers.getBeneficio);


module.exports = router;