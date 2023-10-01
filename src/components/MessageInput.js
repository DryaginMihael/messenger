// MessageInput.js
import React, { useState, useRef } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // чтоб не перезагружалась страница
    if (!text) return;
    onSendMessage(text);
    setText('');
    inputRef.current.focus();
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        ref={inputRef}      
        className="message-input"
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={handleChange}
      />
      <button type="submit" className={`send-button ${!text?.length ? 'send-button_disabled' : ''}`}>
        Отправить
      </button>
    </form>
  );
}

export default MessageInput;
