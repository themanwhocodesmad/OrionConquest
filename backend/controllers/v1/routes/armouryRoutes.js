const express = require('express');
const router = express.Router();
const armouryController = require('../../v1/controllers/player/armouryControllers');

// Assuming your route structure is something like this
router.get('/troops/:planetId', armouryController.getTroopDetails);

module.exports = router;
