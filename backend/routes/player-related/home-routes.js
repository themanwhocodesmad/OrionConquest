const express = require('express');
const router = express.Router();
const { getPlanetHomeInformation} =require('../../controllers/gameplay-controllers/player related/player-related-controllers')

// Define the route for /api/user/home-information/
router.get('/api/user/home-information/', getPlanetHomeInformation);

module.exports = router;
