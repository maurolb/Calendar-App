const { Router } = require('express');

const { check } = require('express-validator');
const renew = require('./renew');
const login = require('./login');
const register = require('./register');
const fieldValidators = require('../../middlewares/field-validators');
const jwtValidator = require('../../middlewares/jwt-validator');

const router = Router();

router.route('/')
  .post(
    [
      check('email', 'El email es requerido').isEmail(),
      check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
      fieldValidators,
    ],
    login,
  );

router.route('/register')
  .post(
    [
      check('name', 'El nombre es requerido').not().isEmpty(),
      check('email', 'El email es requerido').isEmail(),
      check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
      fieldValidators,
    ],
    register,
  );

router.route('/renew')
  .get(
    jwtValidator,
    renew,
  );

module.exports = router;
