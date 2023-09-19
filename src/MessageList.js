// MessageList.js
import React from 'react';
import Message from './Message';
import './MessageList.css';

function MessageList({ messages }) {
  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {/* {
        messages.length === 0 &&
        <div className="message-list__empty h-full align-middle flex align-center">
            <span>
                Зловещая тишина...
            </span>
        </div>
      } */}
    </ul>
  );
}

export default MessageList;
