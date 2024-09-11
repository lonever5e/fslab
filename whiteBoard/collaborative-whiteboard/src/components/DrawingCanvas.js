// src/components/DrawingCanvas.js

import React, { forwardRef, useEffect, useRef, useState } from 'react';

// Use React.forwardRef to allow ref to be passed
const DrawingCanvas = forwardRef(({ socket }, canvasRef) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const startDrawing = (event) => {
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;
      setPrevPos({ x, y });
      setIsDrawing(true);
    };

    const draw = (event) => {
      if (!isDrawing) return;

      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      context.beginPath();
      context.moveTo(prevPos.x, prevPos.y);
      context.lineTo(x, y);
      context.stroke();

      // Emit the drawing data to the server
      socket.emit('canvas-draw', {
        prevX: prevPos.x,
        prevY: prevPos.y,
        currentX: x,
        currentY: y,
      });

      setPrevPos({ x, y });
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [isDrawing, prevPos, socket]);

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />;
});

export default DrawingCanvas;
