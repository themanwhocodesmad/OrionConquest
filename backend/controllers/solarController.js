const { solarArray } = require('../models/solarArrayModel');
const { SOLAR_BASE_UPGRADE_DURATION } = require('../constants/solar-enum')
const mongoose = require('mongoose')

// Controller function to CREATE a Research Lab (POST)
const createSolarArray = async (req, res,) => {


    try {

        const solarArray = new SolarArray({
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

        await solarArray.save();

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

        const solar = await SolarArray.findById(id)
        if (!solar) {
            return res.status(404).json({ msg: 'Solar Array not found' })
        }

        // Increment the level of the solar
        soalr.level += 1

        // Update other properties
        solar.populations = (solar.level * (solar.level + 1)) / 2 // Arithmetic sum of the current level
        solar.productionRate = 5 * solar.level
        solar.health = 100 * solar.level

        // Calculate and update upgrade duration
        solar.upgradeDuration = solar.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming solar.upgradeCosts is an object
        solar.upgradeCosts.metal += solar.level * 120
        solar.upgradeCosts.crystal += solar.level * 100
        solar.upgradeCosts.gas += solar.level * 80
        solar.upgradeCosts.energy += solar.level * 50


        await solar.save()

        res.status(200).json({ msg: 'Research solar upgraded successfully', solar: solar })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//Get player's Solar Array (GET)

const getSolarArray = async (req, res) => {
    try {
        const solarArray = await SolarArray.find({})

        if (!solarArray) {
            return res.status(404).json({ msg: 'No Solar Array found' })``
        }

        res.status(200).json(solarArray)

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    createSolarArray,
    upgradeSolarArray,
    getSolarArray
}







