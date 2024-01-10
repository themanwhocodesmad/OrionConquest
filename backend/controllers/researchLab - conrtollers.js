const ResearchLab = require('../models/researchLabModel');
const Building = require('../models/buildingModel');
const CronJob = require('cron').CronJob;

// Middleware to get the player's research lab instance
exports.getResearchLab = async (req, res, next) => {
    try {
        const playerId = req.params.playerId;
        const building = await Building.findById(playerId);

        if (!building) {
            return res.status(404).json({ message: 'Player building not found' });
        }

        let researchLab = building.taskId;

        if (!researchLab) {
            researchLab = await ResearchLab.create({ taskActive: false, research: building.research });
            building.taskId = researchLab._id;
            await building.save();
        }

        res.researchLab = researchLab;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Route to start upgrading the research lab
exports.upgradeResearchLab = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const researchLab = res.researchLab;

        if (researchLab.taskActive) {
            return res.status(400).json({ message: 'Upgrade is already in progress!' });
        }

        const building = await Building.findById(playerId);
        const upgradeDuration = building.calculateUpgradeDuration();
        const upgradeStartTime = Date.now();
        //! Still working on this....
        //Upgrade happens here
        const job = new CronJob(`*/${upgradeDuration} * * * * *`, async () => {
            try {
                const upgradedResearchLab = await ResearchLab.findByIdAndUpdate(
                    researchLab._id,
                    {
                        $inc: { level: 1 },
                        taskActive: false,
                        population: (level * (level + 1)),
                    },
                    { new: true }
                );

                await upgradedResearchLab.save();
                job.stop();

            } catch (error) {
                console.error('Upgrade failed', error);
            }
        });

        job.start();

        await ResearchLab.findByIdAndUpdate(researchLab._id, { taskActive: false, upgradeDuration, upgradeStartTime });

        res.status(200).json({ message: 'Research lab upgrading started' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Ethan please delete
if (ResearchLab.level < 3) {
    return res.status(400).json({ message: 'Requires Research Lab level 3!' });
}







