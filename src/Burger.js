import React, { useState } from 'react';
import './Burger.css';

const Burger = ({toggleSidebar}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurger = () => {
    toggleSidebar();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`burger ${isOpen ? 'open' : ''}`} onClick={toggleBurger}>
      <div className="bar top"></div>
      <div className="bar middle"></div>
      <div className="bar bottom"></div>
    </div>
  );
};

export default Burger;
