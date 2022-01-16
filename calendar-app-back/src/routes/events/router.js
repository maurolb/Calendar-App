const { Router } = require('express');
const { check } = require('express-validator');
const isDate = require('../../helpers/isDate');
const fieldValidators = require('../../middlewares/field-validators');
const getEvents = require('./get');
const postEvent = require('./post');
const putEvent = require('./put');
const removeEvent = require('./remove');

const router = Router();

router.route('/')
  .get(
    getEvents,
  );

router.route('/')
  .post(
    [
      check('title', 'El título es requerido').not().isEmpty(),
      check('start', 'La hora de inicio es requerida').custom(isDate),
      check('end', 'La hora de finalización es requerida').custom(isDate),
      fieldValidators,
    ],
    postEvent,
  );

router.route('/:id')
  .put(
    putEvent,
  );

router.route('/:id')
  .delete(
    removeEvent,
  );

module.exports = router;
