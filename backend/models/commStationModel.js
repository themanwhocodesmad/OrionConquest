const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Mine Comms Station extending Building Schema
const commSchema = new Schema({
   level: { 
      type: Number,
      default: 0,
      max: 1 
   },
})

// Adding Comms Station as a discriminator of Building
const commStation = Building.discriminator('CommStation', commSchema)

module.exports = {
    commStation
}