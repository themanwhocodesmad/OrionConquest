const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define research field schema
const researchFieldSchema = new Schema({
    shipyardEfficiency: {
        level: {
            type: Number,
            default: 0,
            max: 20
        },
        rate: {
            type: Number,
            default: 0,
            max: 100
        },
    },
    impulseEngines: {

        level: {
            type: Number,
            default: 0,
            max: 20
        },
        rate: {
            type: Number,
            default: 0,
            max: 100
        },
    },
    alienTechnology: {
        level: {
            type: Number,
            default: 0,
            max: 10
        },
        rate: {
            type: Number,
            default: 0,
            max: 100
        },
    },
});

// Research Lab Schema with research field schema
const researchLabSchema = new Schema({
    active: { type: Boolean, default: true },
    research: [researchFieldSchema],
});

// Adding ResearchLab as a discriminator of Building
const ResearchLab = Building.discriminator('ResearchLab', ResearchLabSchema)

module.exports = {
    ResearchLab
}
