// src/components/CanvasSync.js

import { useEffect } from 'react';

const CanvasSync = ({ socket, canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw existing canvas state when a new user connects
    socket.on('canvas-state', (canvasData) => {
      canvasData.forEach((data) => {
        context.beginPath();
        context.moveTo(data.prevX, data.prevY);
        context.lineTo(data.currentX, data.currentY);
        context.stroke();
      });
    });

    // Draw when receiving new drawing data from other users
    socket.on('canvas-draw', (data) => {
      context.beginPath();
      context.moveTo(data.prevX, data.prevY);
      context.lineTo(data.currentX, data.currentY);
      context.stroke();
    });

    // Clear the canvas when receiving the clear event
    socket.on('clear-canvas', () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off('canvas-draw');
      socket.off('canvas-state');
      socket.off('clear-canvas');
    };
  }, [socket, canvasRef]);

  return null;
};

export default CanvasSync;
