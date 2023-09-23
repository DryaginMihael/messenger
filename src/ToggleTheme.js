import React, { useState } from 'react';
import './ToggleTheme.css';
import { setTheme, getTheme } from './helpers/theme';

const ToggleTheme = () => {
  const [isDarkTheme, setDarkTheme] = useState(getTheme() === 'dark');

  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
    setTheme(isDarkTheme ? 'dark' : 'light');
  };

  return (
    <div className={'theme-block'}>
        <h1>Темный тема:</h1>
        <div className={`theme-toggle ${isDarkTheme ? 'dark' : 'light'}`}>
            <label>
                <input type="checkbox" onChange={toggleTheme} checked={isDarkTheme} />
                <span className="slider round"></span>
            </label>
        </div>
    </div>
  );
};

export default ToggleTheme;
