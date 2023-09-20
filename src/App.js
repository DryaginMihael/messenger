// ChatApp.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import dotenv from 'dotenv';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getUserId } from './helpers/userId';
import './App.css'

const Axios = axios.create({
  baseURL: 'http://localhost:8080/' || process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const socket = new WebSocket('ws://localhost:8081');

socket.addEventListener('open', (event) => {
  console.log('Соединение установлено');
});

socket.addEventListener('close', () => {
  console.log('Соединение закрыто');
});

// dotenv.config(); // Загрузить переменные окружения из .env файла

function ChatApp() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Axios.get('/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке сообщений:', error);
      }
    })();
  }, []);

  useEffect(() => {
    socket.addEventListener('message', (event) => {    
      // if (eventFromServer === 'newMessage') {
      console.log(`Получено новое сообщение: ${event.data}`);
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
      // }
    });
  }, []);

  // Функция для отправки сообщения
  const sendMessage = async (text) => {
    const newMessage = {
      text,
      sender: getUserId(), // Имя отправителя или идентификатор пользователя
    };

    try {
      // const response = await Axios.post('/api/messages', newMessage);
      socket.send(JSON.stringify(newMessage));

      // Обновление состояния списка сообщений
      setMessages([...messages, newMessage]);
      
      // Обновление состояния списка сообщений
      // this.setState((prevState) => ({
      //   messages: [...prevState.messages, response.data],
      //   messageText: '', // Сброс введенного текста сообщения
      // }));
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
