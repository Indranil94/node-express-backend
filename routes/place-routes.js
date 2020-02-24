const express = require('express');
const controllers = require('../controllers/places-controllers');

const router = express.Router();

router.get('/users/:uid',controllers.getPlaceByUserId);

router.get('/:pid',controllers.getPlaceById);

router.post('/', controllers.createNewPlace);

module.exports = router