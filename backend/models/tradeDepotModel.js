const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Trade Depot Schema extending Building Schema
const tradeSchema = new Schema({
   active: {
      type: Boolean,
      defaut: true
   },
   level: { 
      type: Number, 
      default: 0,
      max: 5
   },
})

// Adding Trade Depot as a discriminator of Building
const tradeDepot = Building.discriminator('tradeDepot', tradeSchema)

module.exports = {
    tradeDepot
}