const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Mine Schema extending Building Schema
const mineSchema = new Schema({
    generated_resources: { type: Number, default: 0 },
    productionRate: { type: Number, default: 0 },
    mineType: {
        type: String,
        enum: ['Oxygen', 'Gas', 'Crystal'],
        required: true
    },
})

// Adding Mine as a discriminator of Building
const Mine = Building.discriminator('Mine', mineSchema)

module.exports = {
    Mine
}