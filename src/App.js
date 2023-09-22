// ChatApp.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getUserId } from './helpers/userId';
import './App.css';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const socket = new WebSocket(process.env.REACT_APP_API_WS_URL);

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection opened');
});

socket.addEventListener('close', () => {
  console.log('WebSocket connection closed');
});

function ChatApp() {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      // const temp = {
      //   "id": 35,
      //   "text": "Оплачу натурой на билет до Батуми номер +790......",
      //   "sender": "zqc2cv0lyp8lmufemvp",
      //   "createdAt": "2023-09-22T09:55:20.829Z",
      //   "updatedAt": "2023-09-22T09:55:20.829Z"
      // };
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
      // Axios.post('/api/messages', newMessage);
      socket.send(JSON.stringify(newMessage));
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
