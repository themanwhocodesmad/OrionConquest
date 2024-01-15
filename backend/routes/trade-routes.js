const express = require('express')
const router = express.Router()
const {
    createTradeDepot,
    upgradeTradeDepot,
    getTradeDepot } = require('../controllers/tradeController')


// get an instance of Trade Depot (GET)
router.get('/:id', getTradeDepot);
// create an instance of Trade Depot(POST)
router.post('/create', createTradeDepot);
// upgrade Trade Depot(PUT)
router.put('/:id', upgradeTradeDepot);

module.exports = router;