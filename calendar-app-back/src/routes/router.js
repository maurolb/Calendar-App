const { Router } = require('express');
const jwtValidator = require('../middlewares/jwt-validator');

const auth = require('./auth/router');
const events = require('./events/router');

const router = Router();

router.use('/api/auth', [auth]);
router.use('/api/events', jwtValidator, [events]);

module.exports = router;
