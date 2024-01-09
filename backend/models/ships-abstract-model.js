// Abstract ships model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const buildCostsSchema = new Schema({
    metal: {
        type: Number, // we can include the constants here
        default: 0
    },
    crystal: {
        type: Number,
        default: 0
    },
    gas: {
        type: Number,
        default: 0
    },
});

const shipsSchema = new Schema({
    name: {
        type: String,
    },
    attackHP: {
        type: Number,

    },
    defenceHP: {
        type: Number,
        default: 100
    },
    speed: {
        type: Number,
        default: 0
    },
    cargoCapacity: {
        type: Number,
        default: 0
    },
    buildTime: {          //This is different for every ship
        type: Number,
        default: 0
    },
    taskId: {
        type: Number,
        default: 0
    },
    buildCosts: {
        type: buildCostsSchema,
        default: {}
    },
}, { discriminatorKey: 'type' });

// Create a base model for ships
module.exports = mongoose.model('Ships', shipsSchema);