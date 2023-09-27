import React, { useState } from 'react';
import './ToggleTheme.css';
import {
  colorSchemes, getColorScheme, setColorScheme as setAppColorScheme
} from './helpers/theme';

const ToggleTheme = () => {
  // const [isDarkTheme, setDarkTheme] = useState(getTheme() === 'dark');
  const [colorScheme, setColorScheme] = useState(getColorScheme());

  // const toggleTheme = () => {
  //   setDarkTheme(prev => {
  //       const isDark = !prev;
  //       setTheme(isDark ? 'dark' : 'light');
  //       return isDark;
  //   });
  // };

  const changeColorScheme = (schemeName) => {
    setAppColorScheme(schemeName);
    setColorScheme(schemeName);
  }

  return (
    <>
      <div className={'theme-block'}>
          {/* <h1>Цветовая схема:</h1> */}
          <div className='color-scheme-list'>
            {
              Object.keys(colorSchemes).map(name => (
                <div
                  key={name}
                  className={`theme-color-scheme ${colorScheme === name ? 'theme-color-scheme_selected' : ''}`}
                  style={{backgroundColor: colorSchemes[name]['--bg-color']}}
                  onClick={() => changeColorScheme(name)}
                ></div>
              ))
            }
          </div>
      </div>
      {/* <div className={'theme-block'}>
          <h1>Темный режим:</h1>
          <div className={`theme-toggle ${isDarkTheme ? 'dark' : 'light'}`}>
              <label>
                  <input type="checkbox" onChange={toggleTheme} checked={isDarkTheme} />
                  <span className="slider round"></span>
              </label>
          </div>
      </div> */}
    </>
  );
};

export default ToggleTheme;
