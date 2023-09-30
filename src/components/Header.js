import React from 'react';
import Burger from './Burger';
import ChatItem from './ChatItem';
import './Header.css';

const Header = ({ toggleSidebar, logout, currentUser }) => {
  return (
    <header className="header">
        <Burger toggleSidebar={toggleSidebar}/>
        {/* <h1>Chat Me</h1> */}
        <ChatItem
          user={currentUser}
        />
        <button
          className="logout-button"
          onClick={logout}
        > 
          Выйти
          <i className="fas fa-sign-out-alt pl-2"></i>
        </button>
    </header>
  );
};

export default Header;
