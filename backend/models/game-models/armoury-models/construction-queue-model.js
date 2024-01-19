const mongoose = require('mongoose')
const Schema = mongoose.Schema

const constructionQueueSchema = new Schema({
    name: { type: String },
    armoury: { type: Schema.Types.ObjectId, ref: 'Armoury', required: true },
    troopType: { type: Schema.Types.ObjectId, ref: 'Troop', required: true },
    quantity: { type: Number, required: true, default: 0 },
    constructionTime: { type: Number, required: true },
    startTime: { type: Date }
}, { timestamps: true }) // Enable timestamps

// Virtual for totalConstructionTime
constructionQueueSchema.virtual('totalConstructionTime').get(function() {
    // Assuming you have a way to calculate the remaining construction time
    return this.remainingConstructionTime * this.quantity
})

// Indexes
constructionQueueSchema.index({ armoury: 1 })
constructionQueueSchema.index({ troopType: 1 })
constructionQueueSchema.index({ startTime: 1 })
constructionQueueSchema.index({ quantity: 1 })

// Post-save middleware
constructionQueueSchema.post('save', function(doc, next) {
    console.log(`Construction job for ${doc.quantity} units saved.`)
    next()
})

const ConstructionQueue = mongoose.model('ConstructionQueue', constructionQueueSchema)

module.exports = ConstructionQueue
