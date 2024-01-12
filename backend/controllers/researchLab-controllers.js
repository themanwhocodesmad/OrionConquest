const { ResearchLab } = require('../models/researchLabModel');
const { LAB_BASE_UPGRADE_DURATION } = require('../constants/lab - enum')
const mongoose = require('mongoose')

// Controller function to CREATE a Research Lab (POST)
const createResearchLab = async (req, res,) => {


    try {

        const researchLab = new ResearchLab({
            taskActive: false,
            upgradeDurationBase: LAB_BASE_UPGRADE_DURATION,
            upgradeDuration: LAB_BASE_UPGRADE_DURATION,
            upgradeCosts: {
                metal: 1000,
                crystal: 1000,
                gas: 1000,
                energy: 100
            }
        });

        await researchLab.save();

        res.status(201).send({ message: "Research Lab created successfully" })

    } catch (error) {
        res.status(500).send({ message: "Error creating Research Lab", error: error.message })
    }
}


// Route to start upgrading the research lab (PUT)
const upgradeResearchLab = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'This is not a valid ID' })
        }

        const Lab = await ResearchLab.findById(id)
        if (!Lab) {
            return res.status(404).json({ msg: 'Research Lab not found' })
        }

        // Increment the level of the Lab
        Lab.level += 1

        // Update other properties
        Lab.populations = (Lab.level * (Lab.level + 1)) / 2 // Arithmetic sum of the current level
        Lab.productionRate = 5 * Lab.level
        Lab.health = 100 * Lab.level

        // Calculate and update upgrade duration
        Lab.upgradeDuration = Lab.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming Lab.upgradeCosts is an object
        Lab.upgradeCosts.metal += Lab.level * 120
        Lab.upgradeCosts.crystal += Lab.level * 100
        Lab.upgradeCosts.gas += Lab.level * 80
        Lab.upgradeCosts.energy += Lab.level * 50


        await Lab.save()

        res.status(200).json({ msg: 'Research Lab upgraded successfully', Lab: Lab })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



//Get player's Research Lab (GET)

const getResearchLab = async (req, res) => {
    try {
        const researchLab = await ResearchLab.find({})

        if (!researchLab) {
            return res.status(404).json({ msg: 'No Research Lab found' })``
        }

        res.status(200).json(researchLab)

    } catch (error) {

        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    createResearchLab,
    upgradeResearchLab,
    getResearchLab
}







