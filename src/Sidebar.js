import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import ToggleTheme from './ToggleTheme';
import { Axios } from './helpers/api';

const Sidebar = ({ isOpen }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      (async () => {
        const response = await Axios.get('/api/users');
        setUsers(response.data);
      })()
  }, [])

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav>
        <ul className='sidebar-chats'>
          {
            users.map(user => (
              <li
                key={user.username}
                className='sidebar-chat'
              >
                {/* <div style={{backgroundImage: `url(${chat.avatar})`}}></div>
                <img src={chat.avatar} alt={chat.name} /> */}
                <span>{user.username}</span>
              </li>
            ))
          }
        </ul>
      </nav>
      <ToggleTheme />
    </div>
  );
};

export default Sidebar;
