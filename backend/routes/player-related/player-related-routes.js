const express = require('express');
const router = express.Router();
const { getUserPlanets, getUserBuildings, createUsersInitialPlanet, getPlanetHomeInformation } = require('../../controllers/gameplay-controllers/player related/player-related-controllers'); 

// POST route to create the initial planet for a user
router.post('/initial', createUsersInitialPlanet);

// GET request for the planets' stores and user information:
//router.get('/home-information/', getPlanetHomeInformation);

router.get('/planets', getUserPlanets);
router.get('/buildings', getUserBuildings);

module.exports = router;
