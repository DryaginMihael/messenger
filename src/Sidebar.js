import React from 'react';
import './Sidebar.css';
import ToggleTheme from './ToggleTheme';

const chats = [{
  id: 1,
  avatar: './img/chat.jpg',
  name: 'Чат 1',
}, {
  id: 1,
  avatar: '',
  name: 'Чат 3',
}, {
  id: 1,
  avatar: '',
  name: 'Чат 3',
}]

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav>
        <ul className='sidebar-chats'>
          {
            chats.map(chat => (
              <li
                key={chat.id}
                className='sidebar-chat'
              >
                {/* <div style={{backgroundImage: `url(${chat.avatar})`}}></div>
                <img src={chat.avatar} alt={chat.name} /> */}
                <span>{chat.name}</span>
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
