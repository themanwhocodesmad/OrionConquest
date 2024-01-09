const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Solar Array Schema extending Building Schema
const solarSchema = new Schema({
  energyGenerated: { 
    type: Number,
    default: 0 
  },
})

// Adding Solar Array as a discriminator of Building
const solarArray = Building.discriminator('SolarArray', solarSchema)

module.exports = {
  solarArray
}