const express = require('express')
const router = express.Router()
const {
    createShield,
    upgradeShield,
    getShield } = require('../controllers/shieldcontroller')


// get an instance of Shield (GET)
router.get('/:id', getShield);
// create an instance of Shield (POST)
router.post('/create', createShield);
// upgrade Shield (PUT)
router.put('/:id', upgradeShield);

module.exports = router;