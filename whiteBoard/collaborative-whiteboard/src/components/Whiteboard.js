// src/components/Whiteboard.js

import { useEffect, useState } from 'react';

import io from 'socket.io-client';

const Whiteboard = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('canvas-update', (data) => {
        // Handle incoming data from WebSocket
      });

      // Emit data when local changes are made
      // socket.emit('canvas-update', localCanvasData);
    }
  }, [socket]);

  return <div>Collaborative Whiteboard</div>;
};

export default Whiteboard;
