const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    //gameMode: { type: Schema.Types.ObjectId, ref: 'GameMode', required: true }, // Assuming GameMode is another model
    playerName: { type: String, unique: true, maxlength: 50 },
    orionCredits: { type: Number, default: 1000 },
    population: { type: Number, default: 0 },
    attackPoints: { type: Number, default: 0 },
    defensePoints: { type: Number, default: 0 },
    raidingPoints: { type: Number, default: 0 },
    playerClassChoices: { type: Map, of: String, default: {} }, // Using a Map for JSON fields
    playerClass: { type: String, maxlength: 50, default: 'class1' },
    specialTroops: { type: Map, of: String, default: {} } // Using a Map for JSON fields
});


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
