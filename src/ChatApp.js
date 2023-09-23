// ChatApp.js
import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Header from './Header';
import Sidebar from './Sidebar';
import { getUserId } from './helpers/userId';
import './ChatApp.css';
import { notify } from './helpers/notification';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const eventSource = new EventSource(process.env.REACT_APP_API_URL + 'api/connect');

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getMessages();
    subscribe();
  }, []);

  const subscribe = async () => {
    eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages(prev => [...prev, newMessage]);
        if (newMessage.sender !== getUserId()) {
          notify(newMessage.text);
        }
    }
  };

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

  // useEffect(() => {
  //   const socket = new WebSocket(process.env.REACT_APP_API_WS_URL);

  //   socket.addEventListener('open', (event) => {
  //     console.log('WebSocket connection opened');
  //   });

  //   socket.addEventListener('close', () => {
  //     console.log('WebSocket connection closed');
  //   });

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
      // setMessages([...messages, newMessage]);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`chat-app ${isSidebarOpen ? 'chat-app_disabled' : ''}`}>
      <Header toggleSidebar={toggleSidebar}/>
      <Sidebar isOpen={isSidebarOpen} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default memo(ChatApp);
