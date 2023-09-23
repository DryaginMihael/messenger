import React from 'react';
import './Sidebar.css';

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
    </div>
  );
};

export default Sidebar;
