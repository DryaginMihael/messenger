import React, { useState } from 'react';
import './ToggleTheme.css';
import { setTheme, getTheme } from './helpers/theme';

const ToggleTheme = () => {
  const [isDarkTheme, setDarkTheme] = useState(getTheme() === 'dark');

  const toggleTheme = () => {
    setDarkTheme(prev => {
        const isDark = !prev;
        setTheme(isDark ? 'dark' : 'light');
        return isDark;
    });
  };

  return (
    <div className={'theme-block'}>
        <h1>Темная тема:</h1>
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
