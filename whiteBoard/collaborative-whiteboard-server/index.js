// server/index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST"],
  },
});

let canvasState = [];  // Store all the drawing actions

io.on('connection', (socket) => {
  console.log('New user connected');

  // Send the current canvas state to the new user
  socket.emit('canvas-state', canvasState);

  socket.on('canvas-draw', (data) => {
    // Save the new drawing data to canvas state
    canvasState.push(data);
    socket.broadcast.emit('canvas-draw', data);  // Send the drawing data to all other clients
  });

  socket.on('clear-canvas', () => {
    canvasState = [];  // Clear the canvas state
    io.emit('clear-canvas');  // Notify all clients to clear their canvas
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
