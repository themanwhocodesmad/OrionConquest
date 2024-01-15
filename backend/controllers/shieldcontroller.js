const { shield } = require('../models/shieldModel');
const { SHIELD_BASE_UPGRADE_DURATION } = require('../constants/shield-enum')
const mongoose = require('mongoose')

// Controller function to CREATE a Research Lab (POST)
const createShield = async (req, res,) => {


    try {

        const Shields = new shield({
            taskActive: false,
            upgradeDurationBase: SHIELD_BASE_UPGRADE_DURATION,
            upgradeDuration: SHIELD_BASE_UPGRADE_DURATION,
            upgradeCosts: {
                metal: 15000,
                crystal: 1300,
                gas: 1400,
                energy: 100
            }
        });

        await Shields.save();

        res.status(201).send({ message: "Shield created successfully" })

    } catch (error) {
        res.status(500).send({ message: "Error creating Shield", error: error.message })
    }
}


// Route to start upgrading the comms station (PUT)
const upgradeShield = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'This is not a valid ID' })
        }

        const Shields = await shield.findById(id)
        if (!Shields) {
            return res.status(404).json({ msg: 'Shield not found' })
        }

        // Increment the level of the Shield
        Shields.level += 1

        // Update other properties
        Shields.populations = (Shields.level * (Shields.level + 1)) / 2 // Arithmetic sum of the current level
        Shields.productionRate = 5 * Shields.level
        Shields.health = 100 * Shields.level

        // Calculate and update upgrade duration
        Shields.upgradeDuration = Shields.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming Shield.upgradeCosts is an object
        Shields.upgradeCosts.metal += Shields.level * 120
        Shields.upgradeCosts.crystal += Shields.level * 100
        Shields.upgradeCosts.gas += Shields.level * 80
        Shields.upgradeCosts.energy += Shields.level * 50


        await Shields.save()

        res.status(200).json({ msg: 'Shield upgraded successfully', Shields: Shields })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//Get player's Comms Station (GET)

const getShield = async (req, res) => {
    try {
        const Shields = await shield.find({})

        if (!Shields) {
            return res.status(404).json({ msg: 'No Shield' })``
        }

        res.status(200).json(Shields)

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    createShield,
    upgradeShield,
    getShield
}







