const { shield } = require('../models/shieldModel');
const { SHIELD_BASE_UPGRADE_DURATION } = require('../constants/shield-enum')
const mongoose = require('mongoose')

// Controller function to CREATE a Research Lab (POST)
const createShield = async (req, res,) => {


    try {

        const shield = new Shield({
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

        await shield.save();

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

        const Shield = await Shield.findById(id)
        if (!Shield) {
            return res.status(404).json({ msg: 'Shield not found' })
        }

        // Increment the level of the Shield
        Shield.level += 1

        // Update other properties
        Shield.populations = (Shield.level * (Shield.level + 1)) / 2 // Arithmetic sum of the current level
        Shield.productionRate = 5 * Shield.level
        Shield.health = 100 * Shield.level

        // Calculate and update upgrade duration
        Shield.upgradeDuration = Shield.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming Shield.upgradeCosts is an object
        Shield.upgradeCosts.metal += Shield.level * 120
        Shield.upgradeCosts.crystal += Shield.level * 100
        Shield.upgradeCosts.gas += Shield.level * 80
        Shield.upgradeCosts.energy += Shield.level * 50


        await Shield.save()

        res.status(200).json({ msg: 'Shield upgraded successfully', Shield: Shield })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//Get player's Comms Station (GET)

const getShield = async (req, res) => {
    try {
        const shield = await Shield.find({})

        if (!shield) {
            return res.status(404).json({ msg: 'No Research Shield' })``
        }

        res.status(200).json(shield)

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    createShield,
    upgradeShield,
    getShield
}







