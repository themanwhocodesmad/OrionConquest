const { commStation } = require('../models/commStationModel');
const { COMMS_BASE_UPGRADE_DURATION } = require('../constants/comms-enum')
const mongoose = require('mongoose')

// Controller function to CREATE a Research Lab (POST)
const createCommsStation = async (req, res,) => {


    try {

        const commsStation = new CommsStation({
            taskActive: false,
            upgradeDurationBase: COMMS_BASE_UPGRADE_DURATION,
            upgradeDuration: COMMS_BASE_UPGRADE_DURATION,
            upgradeCosts: {
                metal: 1000,
                crystal: 1000,
                gas: 1000,
                energy: 100
            }
        });

        await commsStation.save();

        res.status(201).send({ message: "Comms Station created successfully" })

    } catch (error) {
        res.status(500).send({ message: "Error creating Comms Station", error: error.message })
    }
}


// Route to start upgrading the comms station (PUT)
const upgradeCommsStation = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'This is not a valid ID' })
        }

        const Comms = await CommsStation.findById(id)
        if (!Comms) {
            return res.status(404).json({ msg: 'Comms Station not found' })
        }

        // Increment the level of the Comms
        Comms.level += 1

        // Update other properties
        Comms.populations = (Comms.level * (Comms.level + 1)) / 2 // Arithmetic sum of the current level
        Comms.productionRate = 5 * Comms.level
        Comms.health = 100 * Comms.level

        // Calculate and update upgrade duration
        Comms.upgradeDuration = Comms.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming Comms.upgradeCosts is an object
        Comms.upgradeCosts.metal += Comms.level * 120
        Comms.upgradeCosts.crystal += Comms.level * 100
        Comms.upgradeCosts.gas += Comms.level * 80
        Comms.upgradeCosts.energy += Comms.level * 50


        await Comms.save()

        res.status(200).json({ msg: 'Comms Station upgraded successfully', Comms: Comms })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//Get player's Comms Station (GET)

const getCommsStation = async (req, res) => {
    try {
        const commsStation = await CommsStation.find({})

        if (!commsStation) {
            return res.status(404).json({ msg: 'No Research Comms Station' })``
        }

        res.status(200).json(commsStation)

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    createCommsStation,
    upgradeCommsStation,
    getCommsStation
}







