const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Shield Schema extending Building Schema
const shieldSchema = new Schema({
   active: {
      type: Boolean,
      defaut: true
   },
   level: { 
      type: Number,
      default: 0,
      max: 10 
   },
})

// Adding Shield as a discriminator of Building
const shield = Building.discriminator('shield', shieldSchema)

module.exports = {
    shield
}