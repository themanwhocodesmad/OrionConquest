const express = require('express')
const router = express.Router()
const {
    upgradeResearchLab,
    createResearchLab,
    getResearchLab } = require('../controllers/researchLab-controllers')


// get an instance of Research Lab (GET)
router.get('/:id', getResearchLab);
// create an instance of Research Lab (POST)
router.post('/create', createResearchLab);
// upgrade Research Lab (PUT)
router.put('/:id', upgradeResearchLab);

module.exports = router;