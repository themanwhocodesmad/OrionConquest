const express = require('express');
const router = express.Router();
const planetController = require('../controllers/player/planetControllers')

// Routes
router.get('/all', planetController.getAllPlanets);
router.get('/:planetId', planetController.getPlayerPlanetData);

module.exports = router;
