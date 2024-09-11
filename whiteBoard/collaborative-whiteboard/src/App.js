// src/App.js
import React, { useRef } from 'react';

import ActiveUsers from './components/ActiveUsers';
import CanvasSync from './components/CanvasSync';
import DrawingCanvas from './components/DrawingCanvas';
import Whiteboard from './components/Whiteboard';
import io from 'socket.io-client';

const App = () => {
  const socket = io('http://localhost:4000'); // Connect to backend WebSocket server
  const canvasRef = useRef(null);  // This ref will be passed to the DrawingCanvas

  return (
    <div className="App">
      <h1>Real-Time Collaborative Whiteboard</h1>
      <Whiteboard socket={socket} />
      {/* Pass the ref using forwardRef in DrawingCanvas */}
      <DrawingCanvas ref={canvasRef} socket={socket} />
      <CanvasSync socket={socket} canvasRef={canvasRef} />
      <ActiveUsers socket={socket} currentUser="YourUserName" />
    </div>
  );
};

export default App;
