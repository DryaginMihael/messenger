import React from 'react';
import './Sidebar.css';
import ToggleTheme from './ToggleTheme';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav>
        <ul>
          <li>Чат 1</li>
          <li>Чат 2</li>
          <li>Чат 3</li>
        </ul>
      </nav>
      <ToggleTheme />
    </div>
  );
};

export default Sidebar;
