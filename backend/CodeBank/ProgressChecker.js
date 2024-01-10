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