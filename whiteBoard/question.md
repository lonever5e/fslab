# Real-Time Collaborative Whiteboard Q&A

## 1. How would you set up a real-time WebSocket connection in a React component for collaborative editing?

To set up a real-time WebSocket connection in a React component, you would:
- Install a WebSocket client library such as `socket.io-client`.
- Establish the WebSocket connection in a `useEffect` hook to ensure it opens when the component mounts and closes when it unmounts.
- Use WebSocket events to send and receive real-time data (e.g., updates to the collaborative whiteboard).

## 2. Describe how to implement drawing functionality on an HTML5 canvas using React.

To implement drawing functionality on an HTML5 canvas in React:
- Use a `useRef` hook to reference the canvas DOM element.
- Handle mouse events (`mousedown`, `mousemove`, `mouseup`) to track user interaction.
- Use the canvas's 2D context to perform drawing actions such as drawing lines based on user input.

## 3. How can you synchronize the state of the canvas across multiple users in real-time?

To synchronize the canvas across multiple users in real-time:
- Emit drawing data (e.g., coordinates of strokes) from the client to the server via WebSocket whenever a user draws on the canvas.
- Broadcast this data to all other connected clients from the server.
- On receiving the data, each client updates the canvas in real-time to reflect the drawing actions performed by other users.

## 4. Explain how you would handle and display the list of active users.

To handle and display the list of active users:
- Track users when they connect and disconnect by emitting events to the WebSocket server.
- Maintain a list of active users on the server.
- Broadcast the updated list of active users to all clients whenever a user joins or leaves.
- Display this list in the UI by rendering the active users dynamically.

## 5. What measures would you take to ensure the scalability and performance of the real-time collaborative whiteboard?

To ensure scalability and performance:
- Minimize the amount of data sent over WebSockets by sending only essential updates (e.g., stroke coordinates).
- Implement load balancing to distribute WebSocket connections across multiple servers.
- Use server-side state persistence (e.g., in-memory database or cache) to store canvas states for better performance.
- Optimize the frontend by throttling or debouncing events, using requestAnimationFrame for smoother rendering, and applying React optimizations like `useMemo` and `memo`.
