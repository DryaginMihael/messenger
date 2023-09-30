// Message.js
import React from 'react';
import './Message.css';
import { getUserId } from './helpers/userId';

const getDate = (time) => {
  const date =new Date(time);
  let hours = date.getHours();
  hours = ('0' + hours).slice(-2);
  let mins = date.getMinutes();
  mins = ('0' + mins).slice(-2);
  return hours + ':' + mins;
} 

function Message({ message }) {
  const messageClass = message.sender === getUserId() ? 'sent-message' : 'received-message';

  return (
    <li className={`message ${messageClass}`}>
      {message.text}
      <span className="message-info">
        <span className="message-time">
          {getDate(message.createdAt)}
        </span>
      </span>
    </li>
  );
}

export default Message;
