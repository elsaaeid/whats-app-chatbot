const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = app.listen(3001);

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});