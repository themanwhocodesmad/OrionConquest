const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/player/onboardingControllers')

// Routes
router.post('/create', onboardingController.createPlayer);
router.post('/initial', onboardingController.createInitialPlanet);

module.exports = router;
