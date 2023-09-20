// Message.js
import React from 'react';
import './Message.css';
import { getUserId } from './helpers/userId';

function Message({ message }) {
  const messageClass = message.sender === getUserId() ? 'sent-message' : 'received-message';

  return (
    <li className={`message ${messageClass}`}>
      {message.text}
    </li>
  );
}

export default Message;
