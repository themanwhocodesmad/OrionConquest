const { ResearchLab } = require('../models/researchLabModel');
const cron = require('node-cron');
const { COMMS_UPGRADE_DURATION } = require('../constants/comms-enum')
const { Building } = require('../models/buildings-abstract-model')

// Controller function to CREATE a Research Lab
const createCommsStation = async (req, res,) => {


    try {

        const comms = new CommsStation({
            taskActive: false,
            upgradeDurationBase: COMMS_UPGRADE_DURATION,
            upgradeDuration: COMMS_UPGRADE_DURATION,
            upgradeCosts: {
                metal: 1000,
                crystal: 1000,
                gas: 1000,
                energy: 100
            }
        });

        await comms.save();

        res.status(201).send({ message: "Comms Station created successfully" })

    } catch (error) {
        res.status(500).send({ message: "Error creating Comms Station", error: error.message })
    }
}


// Route to start upgrading the research lab
const upgradeCommsStation = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'Not a valid ID' })
        }

        const Lab = await CommsStation.findById(id)
        if (!Lab) {
            return res.status(404).json({ msg: 'Research Lab not found' })
        }

        const upgradeDuration = Lab.calculateUpgradeDuration()


        const job = cron.schedule(`*/${upgradeDuration} * * * * *`, async (id) => {

            const upgradedCommsStation = await CommsStation.findByIdAndUpdate(
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

            await upgradedCommsStation.save()


        });

        res.status(200).json({ message: 'Comms Station upgraded successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Get player's Comms Station

const getCommsStation = async (req, res) => {
    try {
        const researchLab = await ResearchLab.find({})

        if (!researchLab) {
            return res.status(404).json({ msg: 'No Comms Station found' })``
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







