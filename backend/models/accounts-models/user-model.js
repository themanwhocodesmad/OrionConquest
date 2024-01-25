const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  displayName: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    unique: true
  },
  lastName: {
    type: String,

    unique: true
  },
  image: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roles: [String],

  hasPlanets: {type:Boolean, default: false}

});

const User = mongoose.model('User', userSchema);

module.exports = User;
