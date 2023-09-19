// ChatApp.js
import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './App.css'

function ChatApp() {
  const [messages, setMessages] = useState([]);

  // Функция для отправки сообщения
  const sendMessage = (text) => {
    const newMessage = {
      text,
      sender: 'me', // Имя отправителя или идентификатор пользователя
    };

    setMessages([...messages, newMessage]);
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
