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
          <i className="fas fa-sign-out-alt"></i>
        </button>
    </header>
  );
};

export default Header;
