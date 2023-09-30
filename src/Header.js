import React from 'react';
import Burger from './Burger';
import './Header.css';

const Header = ({ toggleSidebar, logout }) => {
  return (
    <header className="header">
        <Burger toggleSidebar={toggleSidebar}/>
        {/* <h1>Chat Me</h1> */}
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
