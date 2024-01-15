const { tradeDepot } = require('../models/tradeDepotModel');
const { TRADE_BASE_UPGRADE_DURATION } = require('../constants/lab - enum')
const mongoose = require('mongoose')

// Controller function to CREATE a Research Lab (POST)
const createTradeDepot = async (req, res,) => {


    try {

        const trade = new tradeDepot({
            taskActive: false,
            upgradeDurationBase: TRADE_BASE_UPGRADE_DURATION,
            upgradeDuration: TRADE_BASE_UPGRADE_DURATION,
            upgradeCosts: {
                metal: 3000,
                crystal: 3000,
                gas: 3000,
                energy: 100
            }
        });

        await trade.save();

        res.status(201).send({ message: "Trade Depot created successfully" })

    } catch (error) {
        res.status(500).send({ message: "Error creating Trade Depot", error: error.message })
    }
}


// Route to start upgrading the research lab (PUT)
const upgradeTradeDepot = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'This is not a valid ID' })
        }

        const tradeDep = await tradeDepot.findById(id)
        if (!tradeDep) {
            return res.status(404).json({ msg: 'Trade Depot not found' })
        }

        // Increment the level of the depot
        tradeDep.level += 1

        // Update other properties
        tradeDep.populations = (tradeDep.level * (tradeDep.level + 1)) / 2 // Arithmetic sum of the current level
        tradeDep.productionRate = 5 * tradeDep.level
        tradeDep.health = 100 * tradeDep.level

        // Calculate and update upgrade duration
        tradeDep.upgradeDuration = tradeDep.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming Depot.upgradeCosts is an object
        tradeDep.upgradeCosts.metal += tradeDep.level * 120
        tradeDep.upgradeCosts.crystal += tradeDep.level * 100
        tradeDep.upgradeCosts.gas += tradeDep.level * 80
        tradeDep.upgradeCosts.energy += tradeDep.level * 50


        await tradeDep.save()

        res.status(200).json({ msg: 'Trade Depot upgraded successfully', tradeDep: tradeDep })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//Get player's Trade Depot (GET)

const getTradeDepot = async (req, res) => {
    try {
        const tradeDep = await tradeDepot.find({})

        if (!tradeDep) {
            return res.status(404).json({ msg: 'No Research Lab found' })``
        }

        res.status(200).json(tradeDep)

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    createTradeDepot,
    upgradeTradeDepot,
    getTradeDepot
}
