// ChatApp.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import dotenv from 'dotenv';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getUserId } from './helpers/userId';
import './App.css'

const Axios = axios.create({
  baseURL: 'https://chattogether.site/' || process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// const socket = new WebSocket('ws://34.110.139.196:8081/');

// socket.addEventListener('open', (event) => {
//   console.log('Соединение установлено');
// });

// socket.addEventListener('close', () => {
//   console.log('Соединение закрыто');
// });

// dotenv.config(); // Загрузить переменные окружения из .env файла

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await Axios.get('/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке сообщений:', error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    setInterval(getMessages, 10000);
  }, []);

  // useEffect(() => {
  //   socket.addEventListener('message', (event) => {    
  //     // if (eventFromServer === 'newMessage') {
  //     console.log(`Получено новое сообщение: ${event.data}`);
  //     setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
  //     // }
  //   });
  // }, []);

  // Функция для отправки сообщения
  const sendMessage = async (text) => {
    const newMessage = {
      text,
      sender: getUserId(), // Имя отправителя или идентификатор пользователя
    };

    try {
      Axios.post('/api/messages', newMessage);
      // socket.send(JSON.stringify(newMessage));

      // Обновление состояния списка сообщений
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  return (
    <div className="chat-app">
      {/* <h1>SunsetChat</h1> */}
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatApp;
