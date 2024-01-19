const Agenda = require('agenda')
const ConstructionQueue = require('../models/game-models/armoury-models/construction-queue-model')
const Armoury = require('../models/game-models/armoury-models/armoury-model') 

const mongoConnectionString = process.env.MONGO_URI
const constructionQueueAgenda = new Agenda({ db: { address: mongoConnectionString } })

async function processConstructionQueue() {
    try {
        // Fetch only jobs that are due for processing
        const constructionJobs = await ConstructionQueue.find({ 
            quantity: { $gt: 0 },
            startTime: { $lte: new Date() }
        })

        let nearestCompletionTime = null

        for (const job of constructionJobs) {
            // Logic to process each construction job
            const timeElapsed = new Date() - job.startTime // This is in milliseconds
            const timeElapsedInSeconds = timeElapsed / 1000 // Convert milliseconds to seconds

            if (timeElapsedInSeconds >= job.constructionTime) {
                job.quantity -= 1

                if (job.quantity > 0) {
                    await updateArmoury(job.armoury, job.troopType)
                    job.startTime = new Date() // Reset startTime for the next unit
                    await job.save()
                } else {
                    await ConstructionQueue.findByIdAndRemove(job._id) // Quantity is zero, remove the job from the queue
                }
            }

            // Calculate and store the nearest completion time
            const completionTime = new Date(job.startTime.getTime() + job.constructionTime * 1000)
            if (!nearestCompletionTime || completionTime < nearestCompletionTime) {
                nearestCompletionTime = completionTime
            }
        }

        // Schedule next run dynamically based on the nearest completion time
        if (nearestCompletionTime) {
            const delay = nearestCompletionTime - new Date()
            constructionQueueAgenda.schedule(new Date(Date.now() + delay), 'process construction queue')
        }
    } catch (error) {
        console.error('Error processing construction queue:', error)
    }
}

async function startAgenda() {
    try {
        constructionQueueAgenda.define('process construction queue', processConstructionQueue)

        await constructionQueueAgenda.start()
        processConstructionQueue() // Kick off the first job
    } catch (error) {
        console.error('Error starting Agenda:', error)
    }
}

process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing ConstructionQueueAgenda')
    await constructionQueueAgenda.stop()
})

module.exports = startAgenda

const updateArmoury = async (armouryId, troopType) => {
    try {
        const armoury = await Armoury.findById(armouryId)
        if (!armoury) {
            throw new Error('Armoury not found')
        }

        const existingTroop = armoury.troops.find(t => t._id.toString() === troopType.toString())
        console.log('Troop created:', existingTroop)

        if (existingTroop) {
            existingTroop.quantity += 1
        } else {
            armoury.troops.push({ _id: troopType, quantity: 1 })
        }

        await armoury.save()
    } catch (error) {
        console.error('Error updating armoury:', error)
        throw error // Rethrow the error for further handling if necessary
    }
}
