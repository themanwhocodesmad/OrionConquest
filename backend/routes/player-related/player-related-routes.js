const express = require('express');
const router = express.Router();
const { getUserPlanets, getUserBuildings } = require('../../controllers/gameplay-controllers/player related/player-related-controllers'); 

router.get('/planets', getUserPlanets);
router.get('/buildings', getUserBuildings);

module.exports = router;
