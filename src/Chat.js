// ChatApp.js
import React, { useEffect, useState, memo, useCallback } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Header from './Header';
import Sidebar from './Sidebar';
import { getUserId } from './helpers/userId';
import './Chat.css';
import { notify } from './helpers/notification';
import { initColorScheme } from './helpers/theme';
import { Axios } from './helpers/api';

initColorScheme();

const eventSource = new EventSource(process.env.REACT_APP_API_URL + 'api/connect');

function Chat({logout}) {
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getMessages();
    subscribe();
  }, []);

  const subscribe = async () => {
    eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        if (newMessage.sender !== getUserId()) {
          setMessages(prev => [...prev, newMessage]);
          notify(newMessage.text);
        }
    }
  };

  const getMessages = async () => {
    try {
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
      const response = await Axios.post('/api/messages', newMessage);
      // socket.send(JSON.stringify(newMessage));
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  // Api пока нет
  const chooseChat = useCallback(async (chatId) => {
    try {
      const response = await Axios.get('/api/chat/' + chatId);
      setMessages(response.data);
    } catch (e) {
      console.error('Ошибка при получении чата: ', e);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`chat-app ${isSidebarOpen ? 'chat-app_disabled' : ''}`}>
      <Header toggleSidebar={toggleSidebar} logout={logout}/>
      <Sidebar isOpen={isSidebarOpen} chooseChat={chooseChat} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default memo(Chat);
