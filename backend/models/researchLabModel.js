const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Building = require('./buildings-abstract-model')


// Research Lab Schema with research field schema
const researchLabSchema = new Schema({
    taskActive: {
        type: Boolean,
        default: false
    },

})

// Adding ResearchLab as a discriminator of Building
const ResearchLab = Building.discriminator('ResearchLab', researchLabSchema)

module.exports = {
    ResearchLab
}
