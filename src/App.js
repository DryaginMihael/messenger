import React, { useEffect, useState } from 'react';
import { Axios } from './helpers/api';
import Chat from './Chat';
import Input from './components/Input';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [isReg, setIsReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    checkAuth();
  }, [])

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
        const response = await Axios.post(`/api/${isReg ? 'reg' : 'login'}`, { username, password });
        const token = response.data.token;
        if (token) {
          localStorage.setItem('token', response.data.token);
          setIsAuth(true);
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message);
        setIsAuth(false);
        console.error(error);
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Если токен есть в локальном хранилище, выполните запрос к серверу
      Axios.get('/check-auth', {
        headers: {
          'Authorization': `Bearer ${token}}`,
        },
      })
      .then((response) => {
        // В случае успешного ответа, вы можете установить авторизацию в вашем React-приложении
        setIsAuth(true);
      })
      .catch((error) => {
        console.log('Ошибка проверки аутентификации:', error);
      })
      .finally(() => {
        setIsAuth(true); // TODO: не правильно
      })
    }
  }

  const logout = () => {
    setIsAuth(false);
    localStorage.setItem('token', '');
  }

  return (
    <div className="app">
      {isAuth ? (
          <Chat logout={logout}/>
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
