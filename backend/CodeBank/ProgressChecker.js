// Route to get the upgrade progress of the research lab

exports.getUpgradeProgress = async (req, res) => {
    try {
        const researchLab = res.researchLab;

        if (!researchLab.active) {
            const building = await Building.findById(req.params.playerId);
            const upgradeDuration = building.calculateUpgradeDuration();
            const timeElapsed = Date.now() - researchLab.upgradeStartTime;
            const percentage = Math.floor((timeElapsed / upgradeDuration) * 100);

            return res.status(200).json({ percentage, upgradeDuration });
        }

        res.status(200).json({ message: 'Research lab is not being upgraded' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

try {
    /**const playerId = req.params.playerId; */  //! For testing purposes - no player model yet
    const building = await Building.findById(); //! playerId later as parameter

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

// Define research field schema
const researchFieldSchema = new Schema({
    shipyardEfficiency: {
        level: {
            type: Number,
            default: 0,
            max: 20
        },
        rate: {
            type: Number,
            default: 0,
            max: 100
        },
    },
    impulseEngines: {

        level: {
            type: Number,
            default: 0,
            max: 20
        },
        rate: {
            type: Number,
            default: 0,
            max: 100
        },
    },
    alienTechnology: {
        level: {
            type: Number,
            default: 0,
            max: 10
        },
        rate: {
            type: Number,
            default: 0,
            max: 100
        },
    },
});
