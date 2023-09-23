import React from 'react';
import Burger from './Burger';
import './Header.css';

const Header = ({toggleSidebar}) => {
  return (
    <header className="header">
        <Burger toggleSidebar={toggleSidebar}/>
        <h1>Chat Me</h1>
    </header>
  );
};

export default Header;
