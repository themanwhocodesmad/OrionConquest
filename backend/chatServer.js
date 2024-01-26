const socketIo = require('socket.io');
const chatController = require('./controllers/v1/chatroom/chatController'); 

const initializeChatServer = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected to chat');

        socket.on('sendMessage', (data) => {
            chatController.postChatMessage(data);
            io.emit('message', data); // broadcast the message to all clients
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected from chat');
        });
    });
};

module.exports = initializeChatServer;
