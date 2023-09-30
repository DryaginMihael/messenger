import React from 'react';
import './Sidebar.css';
import ToggleTheme from './components/ToggleTheme';
import ChatsList from './components/ChatsList';

const Sidebar = ({ isOpen, chooseChat, users, currentUser }) => {

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ChatsList
        users={users}
        currentUser={currentUser}
        chooseChat={chooseChat}
      />
      <ToggleTheme />
    </div>
  );
};

export default Sidebar;
