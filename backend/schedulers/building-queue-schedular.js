const Agenda = require('agenda')
const BuildingQueue = require('../models/game-models/building-models/building-upgrade-queue')
const Building = require('../models/game-models/building-models/buildings-abstract-model')

const mongoConnectionString = process.env.MONGO_URI
const buildingQueueAgenda = new Agenda({ db: { address: mongoConnectionString } })

async function processBuildingQueue() {

    /**
     * processBuildingQueue - Processes the building queue for upgrades.
     * This function finds the oldest queued building, upgrades it if the upgrade time has passed,
     * and then removes it from the queue. After processing, it schedules the next job based on
     * the upgrade end time of the next oldest building. It handles errors during the upgrade process
     * and ensures that the upgrade logic is executed at the correct time for each building.
     */
    try {
        const oldestBuildingInQueue = await BuildingQueue.findOne({ status: 'queued' })
            .sort({ queuedAt: 1 })
            .populate('building')

        if (oldestBuildingInQueue && new Date() >= oldestBuildingInQueue.upgradeEndTime) {
            // Fetch the building details
            const building = await Building.findById(oldestBuildingInQueue.building._id)
            if (building) {
                try {
                    // Upgrade the building
                    building.upgrade()
                    await building.save()
                } catch (upgradeError) {
                    console.error('Error during building upgrade:', upgradeError)
                    return // Early return on error
                }

                // Remove the upgraded building from the queue
                const deleteResult = await BuildingQueue.deleteOne({ _id: oldestBuildingInQueue._id })
                if (deleteResult.deletedCount === 1) {
                    console.log('Upgraded and removed building from queue:', building)
                } else {
                    console.warn('Failed to remove building from queue:', oldestBuildingInQueue._id)
                }
            }
        }

        // Schedule next job
        const nextBuilding = await BuildingQueue.findOne({ status: 'queued' })
            .sort({ queuedAt: 1 })

        if (nextBuilding) {
            const delay = nextBuilding.upgradeEndTime - new Date()
            if (delay > 0) {
                buildingQueueAgenda.schedule(new Date(Date.now() + delay), 'process building queue')
            }
        }
    } catch (error) {
        console.error('Error processing the oldest building in queue:', error)
    }
}

async function startAgenda() {
    try {
        buildingQueueAgenda.define('process building queue', processBuildingQueue)

        await buildingQueueAgenda.start()
        // Initially schedule the job for the first time
        processBuildingQueue()

    } catch (error) {
        console.error('Error starting Agenda:', error)
    }
}

process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing ConstructionQueueAgenda')
    await buildingQueueAgenda.stop()
})

module.exports = startAgenda
