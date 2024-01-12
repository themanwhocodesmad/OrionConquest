const { ResearchLab } = require('../models/researchLabModel');
const cron = require('node-cron');
const { LAB_BASE_UPGRADE_DURATION } = require('../constants/lab - enum')
const { Building } = require('../models/buildings-abstract-model')

// Controller function to CREATE a Research Lab
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


// Route to start upgrading the research lab
const upgradeResearchLab = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'Not a valid ID' })
        }

        const Lab = await ResearchLab.findById(id)
        if (!Lab) {
            return res.status(404).json({ msg: 'Research Lab not found' })
        }

        const upgradeDuration = Lab.calculateUpgradeDuration()


        const job = cron.schedule(`*/${upgradeDuration} * * * * *`, async (id) => {

            const upgradedResearchLab = await ResearchLab.findByIdAndUpdate(
                id,
                {
                    $set: {
                        level: (level + 1),
                        taskActive: false,
                        population: (level * (level + 1)),
                        health: (100 * level),
                        upgradeCosts: {
                            metal: (level * 120),
                            crystal: (level * 100),
                            gas: (level * 80),
                            energy: (level * 50),
                        }

                    }
                },
                { new: true }
            );

            await upgradedResearchLab.save()


        });

        res.status(200).json({ message: 'Research lab upgraded successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Get player's Research Lab

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







