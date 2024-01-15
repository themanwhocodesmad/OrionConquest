const express = require('express')
const router = express.Router()
const {
    createSolarArray,
    upgradeSolarArray,
    getSolarArray } = require('../controllers/solarController')


// get an instance of Solar Array (GET)
router.get('/:id', getSolarArray);
// create an instance of Solar Array (POST)
router.post('/create', createSolarArray);
// upgrade Research Solar Array (PUT)
router.put('/:id', upgradeSolarArray);

module.exports = router;