const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who sent the message
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true }, // Reference to the Player associated with the User
  message: { type: String, required: true }, // The actual chat message
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of Users who liked the message
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of Users who disliked the message
  reports: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of Users who reported the message
  isDeleted: { type: Boolean, default: false } // Flag to soft delete the message by admin
}, { timestamps: true }); // Enabling automatic timestamps

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
