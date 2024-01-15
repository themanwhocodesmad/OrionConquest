const { solarArray } = require('../models/solarArrayModel');
const { SOLAR_BASE_UPGRADE_DURATION } = require('../constants/solar-enum')
const mongoose = require('mongoose')

// Controller function to CREATE a Research Lab (POST)
const createSolarArray = async (req, res,) => {


    try {

        const solar = new solarArray({
            taskActive: false,
            upgradeDurationBase: SOLAR_BASE_UPGRADE_DURATION,
            upgradeDuration: SOLAR_BASE_UPGRADE_DURATION,
            upgradeCosts: {
                metal: 1000,
                crystal: 1000,
                gas: 1000,
                energy: 100
            }
        });

        await solar.save();

        res.status(201).send({ message: "Solar Array created successfully" })

    } catch (error) {
        res.status(500).send({ message: "Error creating Solar Array", error: error.message })
    }
}


// Route to start upgrading the research solar (PUT)
const upgradeSolarArray = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'This is not a valid ID' })
        }

        const Solar = await solarArray.findById(id)
        if (!Solar) {
            return res.status(404).json({ msg: 'Solar Array not found' })
        }

        // Increment the level of the solar
        Solar.level += 1

        // Update other properties
        Solar.populations = (Solar.level * (Solar.level + 1)) / 2 // Arithmetic sum of the current level
        Solar.productionRate = 5 * Solar.level
        Solar.health = 100 * Solar.level

        // Calculate and update upgrade duration
        Solar.upgradeDuration = Solar.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming Solar.upgradeCosts is an object
        Solar.upgradeCosts.metal += Solar.level * 120
        Solar.upgradeCosts.crystal += Solar.level * 100
        Solar.upgradeCosts.gas += Solar.level * 80
        Solar.upgradeCosts.energy += Solar.level * 50


        await Solar.save()

        res.status(200).json({ msg: 'Solar Array upgraded successfully', Solar: Solar })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//Get player's Solar Array (GET)

const getSolarArray = async (req, res) => {
    try {
        const solar = await solarArray.find({})

        if (!solar) {
            return res.status(404).json({ msg: 'No Solar Array found' })``
        }

        res.status(200).json(solar)

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    createSolarArray,
    upgradeSolarArray,
    getSolarArray
}







