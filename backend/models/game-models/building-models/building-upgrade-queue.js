const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buildingQueueSchema = new Schema({
    name: { type: String, required: true },
    planet: { 
        type: Schema.Types.ObjectId, 
        ref: 'Planet',
        required: true
    },
    building: { 
        type: Schema.Types.ObjectId, 
        ref: 'Building',
        required: true
    },
    targetLevel: {
        type: Number,
        required: true
    },
    queuedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['queued', 'in progress', 'completed', 'cancelled'],
        default: 'queued'
    },
    upgradeDuration: {
        type: Number,
        required: true
    },
    upgradeStartTime: {
        type: Date
    },
    upgradeEndTime: {
        type: Date
    }
})

// Index for queuedAt
buildingQueueSchema.index({ queuedAt: 1 })

// Index for status
buildingQueueSchema.index({ status: 1 })

// Compound index for status and queuedAt
buildingQueueSchema.index({ status: 1, queuedAt: 1 })

// Index for upgradeEndTime, if frequently queried or sorted
buildingQueueSchema.index({ upgradeEndTime: 1 })

const BuildingQueue = mongoose.model('BuildingQueue', buildingQueueSchema)

module.exports = BuildingQueue
