const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')
const MineTypes = require('../constants/mines-enum')


// Shipyard Schema extending Building Schema
const shipyardSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    }
})

// Adding Shipyard as a discriminator of Building
const Shipyard = Building.discriminator('Shipyard', shipyardSchema)

module.exports = {
    Shipyard
}