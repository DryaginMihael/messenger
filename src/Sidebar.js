import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import ToggleTheme from './ToggleTheme';
import { Axios } from './helpers/api';

const Sidebar = ({ isOpen, chooseChat }) => {
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
                onClick={() => chooseChat(user.username)}
              >
                {
                  user.avatar ?
                    (<img src={user.avatar} alt=''/>) :
                    (<div className='chat-avatar-letter'>
                      <span>
                        {user.username[0]}
                      </span>
                    </div>)
                }
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
