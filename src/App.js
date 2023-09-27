import React, { useState } from 'react';
import { Axios } from './helpers/api';
import Chat from './Chat';
import Input from './Input';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [token, setToken] = useState('');
  const [isReg, setIsReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        if (!username) {
          setErrorMessage('Введите логин');
          return;
        } else if (!password) {
          setErrorMessage('Введите пароль');
          return;
        } else if (isReg) {
          if (password!== repeatedPassword) {
            setErrorMessage('Пароли не совпадают');
            return;
          } else if (errorMessage) {
            setErrorMessage('');
          }
        }
        const response = await Axios.post(`/api/${isReg ? 'reg' : 'login'}`, { username, password })
        setToken(response.data.token);
    } catch (error) {
        setErrorMessage(error.response?.data?.message);
        console.error(error);
    }
  };

  return (
    <div className="app">
      {token ? (
          <Chat />
      ) : (
        <form className={`auth-container ${isReg ? 'auth-container_reg' : ''}`}>
          <h1 className="error-message">{errorMessage}⠀</h1>
          <input
            className="input-field"
            placeholder="Логин"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Пароль"
            onChange={setPassword}
          />
          {isReg && (<Input
            type="password"
            placeholder="Повторите пароль"
            onChange={setRepeatedPassword}
          />)}
          <div className="auth-buttons">
            <h1
              className="reg-suggest"
              onClick={() => setIsReg(prev => {
                setErrorMessage('');
                return !prev;
              })}
            >
              {isReg ? 'Войти?' : 'Нет аккаунта?'}
            </h1>
            <button
              type="submit"
              className="auth-button login-button"
              onClick={handleLogin}>
              {
                isReg ? 'Регистрация' : 'Войти'
              }
            </button>
          </div> 
        </form>
      )}
    </div>
  );
}

export default App;
