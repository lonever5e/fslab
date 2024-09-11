// src/components/ActiveUsers.js

import { useEffect, useState } from 'react';

const ActiveUsers = ({ socket, currentUser }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.emit('user-join', { username: currentUser });

    socket.on('user-list', (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.emit('user-leave', { username: currentUser });
    };
  }, [socket, currentUser]);

  return (
    <div>
      <h3>Active Users:</h3>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;
