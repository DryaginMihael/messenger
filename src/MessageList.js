// MessageList.js
import React, { useEffect, useRef } from 'react';
import Message from './components/Message';
import './MessageList.css';

function MessageList({ messages }) {
  const listEl = useRef(null);

  useEffect(() => {
    listEl.current.scrollTop = listEl.current.scrollHeight;
  }, [messages?.length]);

  return (
    <div className="message-list-container">
      <ul ref={listEl} className="message-list">
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
    </div> 
  );
}

export default MessageList;
