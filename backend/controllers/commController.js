//todo Busy With
const CommStation = require('./commStationModel')
const Player = require('./player-model')

const calculateUpgradeDuration = (currentLevel) => {
 // This is an example formula. Adjust as needed.
 return 35 * Math.pow(1.75, currentLevel)
}

const calculateUpgradeCosts = (baseCosts, currentLevel) => {
 return {
    metal: baseCosts.metal * Math.pow(1.75, currentLevel),
    crystal: baseCosts.crystal * Math.pow(1.75, currentLevel),
    gas: baseCosts.gas * Math.pow(1.75, currentLevel),
    energy: baseCosts.energy * Math.pow(1.75, currentLevel),
 }
}

const createCommStationInstance = async (playerId) => {
 try {
    const player = await Player.findById(playerId)
    const commStation = new CommStation({
      playerId: playerId,
      name: 'Comm Station',
      level: 0,
      health: 100,
      upgradeDuration: calculateUpgradeDuration(0),
      upgradeDurationBase: 35,
      upgradeStartTime: Date.now(),
      taskId: 0,
      upgradeCosts: calculateUpgradeCosts(
        { metal: 120, crystal: 120, gas: 120, energy: 5 },
        0
      ),
      populations: (0 * (player.CommStation.level + 1)) / 2, // Arithmetic sum of the current level
    })
    await commStation.save()
    return commStation
 } catch (error) {
    console.error(error)
    throw error
 }
}

const upgradeCommStation = async (commStationId) => {
 try {
    const commStation = await CommStation.findById(commStationId)
    const player = await Player.findById(commStation.playerId)
    if (player.resources.metal >= commStation.upgradeCosts.metal &&
        player.resources.crystal >= commStation.upgradeCosts.crystal &&
        player.resources.gas >= commStation.upgradeCosts.gas &&
        player.resources.energy >= commStation.upgradeCosts.energy) {
      player.resources.metal -= commStation.upgradeCosts.metal
      player.resources.crystal -= commStation.upgradeCosts.crystal
      player.resources.gas -= commStation.upgradeCosts.gas
      player.resources.energy -= commStation.upgradeCosts.energy
      commStation.level += 1
      commStation.health += 100
      commStation.upgradeDuration = calculateUpgradeDuration(commStation.level)
      commStation.upgradeDurationBase = 35
      commStation.upgradeStartTime = Date.now()
      commStation.taskId = 0
      commStation.upgradeCosts = calculateUpgradeCosts(commStation.upgradeCosts, commStation.level)
      commStation.populations = (commStation.level * (player.commStation.level + 1)) / 2
      await player.save()
      await commStation.save()
      return { message: 'Comm Station upgraded successfully' }
    } else {
      throw new Error('Not enough resources to upgrade Comm Station')
    }
 } catch (error) {
    console.error(error)
    throw error
 }
}

module.exports = {
 createCommStationInstance,
 upgradeCommStation,
}



//Ethan please delete
if (ResearchLab.level < 3) {
    return res.status(400).json({ message: 'Requires Research Lab level 3!' });
}