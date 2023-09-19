// Message.js
import React from 'react';
import './Message.css';

function Message({ message }) {
  const messageClass = message.sender === 'me' ? 'sent-message' : 'received-message';

  return (
    <li className={`message ${messageClass}`}>
      {message.text}
    </li>
  );
}

export default Message;
