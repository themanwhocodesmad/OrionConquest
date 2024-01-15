const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
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

});

const User = mongoose.model('User', userSchema);

module.exports = User;
