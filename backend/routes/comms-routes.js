const express = require('express')
const router = express.Router()
const {
    createCommsStation,
    upgradeCommsStation,
    getCommsStation } = require('../controllers/commController')


// get an instance of Comms Station (GET)
router.get('/:id', getCommsStation);
// create an instance of Comms Station (POST)
router.post('/create', createCommsStation);
// upgrade Comms Station (PUT)
router.put('/:id', upgradeCommsStation);

module.exports = router;