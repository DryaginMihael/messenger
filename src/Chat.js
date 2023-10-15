// ChatApp.js
import React, { useEffect, useState, memo, useCallback } from 'react';
import MessageList from './MessageList';
import MessageInput from './components/MessageInput';
import Header from './components/Header';
import Sidebar from './Sidebar';
import { getUserId } from './helpers/userId';
import './Chat.css';
import { notify } from './helpers/notification';
import { initColorScheme } from './helpers/theme';
import { Axios } from './helpers/api';
import ChatsList from './components/ChatsList';

initColorScheme();

const eventSource = new EventSource(process.env.REACT_APP_API_URL + 'api/connect');

function Chat({logout}) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getMessages();
    subscribe();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await Axios.get('/api/users');
      setUsers(response.data);
    })()
}, [])

  const subscribe = async () => {
    eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        if (newMessage.user_id !== getUserId()) {
          setMessages(prev => [...prev, newMessage]);
          notify(newMessage.text);
        }
    }
  };

  const getMessages = async () => {
    try {
      const userId = getUserId();
      const recipientId = currentUser?.id;
      if (userId && recipientId) {
        const response = await Axios.get('/api/messages', {
          userId,
          recipientId: currentUser?.id,
        });
        setMessages(response.data);
      }
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
      userId: getUserId(), // Id отправителя
      recipientId: currentUser.id // Id получателя
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
      setSidebarOpen(false);
      const newCurrentUser = users?.find(user => user.username === chatId);
      setCurrentUser(newCurrentUser);
      const response = await Axios.get('/api/messages', {
        params: {
          userId: getUserId(), // Id отправителя
          recipientId: newCurrentUser.id 
        }
      });
      setMessages(response.data);
    } catch (e) {
      console.error('Ошибка при получении чата: ', e);
    }
  }, [users]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`chat-app ${isSidebarOpen ? 'chat-app_disabled' : ''}`}>
      <Header
        toggleSidebar={toggleSidebar}
        currentUser={currentUser}
        logout={logout}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        users={users}
        currentUser={currentUser}
        chooseChat={chooseChat}
      />
      {
        currentUser ? (<>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={sendMessage} />
        </>) :
        (<ChatsList
          users={users}
          currentUser={currentUser}
          chooseChat={chooseChat}
        />)
      }
    </div>
  );
}

export default memo(Chat);
