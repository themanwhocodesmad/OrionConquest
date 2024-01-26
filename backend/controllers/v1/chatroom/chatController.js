const ChatMessage = require('../../../models/chat-room-models/chat-message-model'); // adjust path as needed

exports.postChatMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newMessage = new ChatMessage({ 
      user: userId, 
      message: message,
      // add other fields like player, etc., as needed
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find().populate('user').populate('player');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

