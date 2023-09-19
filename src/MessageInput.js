// MessageInput.js
import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText('');
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        className="message-input"
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={handleChange}
      />
      <button type="submit" className="send-button">
        Отправить
      </button>
    </form>
  );
}

export default MessageInput;
