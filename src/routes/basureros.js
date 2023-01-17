const router = require('express').Router();
const controllers = require('../controller/basureros')

router.get('/', controllers.getAllBasureros);

router.post('/',controllers.AddBasurero);

router.get('/:id',controllers.getBasurero);


module.exports = router;