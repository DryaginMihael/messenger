import React, { useCallback, useEffect, useState } from 'react';
import './ChatItem.css';

let intervalId = null;
let initialText = 'печатает';

const ChatItem = ({ user, chooseChat, currentUser, className }) => {
    const [typingText, setTypingText] = useState('');

    const simulateTyping = useCallback(() => {
        intervalId = setInterval(() => {
            setTypingText(prev => {
                if (!prev.includes(initialText) || prev.includes('...')) {
                    return initialText
                } else {
                    return prev + '.';
                }
            })
        }, 300);
    }, []);

    useEffect(() => {
        if (user && currentUser && user?.id === currentUser?.id) {
            simulateTyping();
        } else if (intervalId) {
            clearInterval(intervalId);
        }
    }, [user, currentUser, currentUser?.id, user?.id, simulateTyping]);

    return (user &&
        <li
            className={`${className} chat-item ${user.id === currentUser?.id ? 'chat-item_selected' : ''}`}
            onClick={() => chooseChat?.(user.username)}
        >
            {
            user.avatar ?
                (<img src={user.avatar} alt=''/>) :
                (<div className='chat-avatar-letter'>
                <span>
                    {user.username[0]}
                </span>
                </div>)
            }
            {/* <div style={{backgroundImage: `url(${chat.avatar})`}}></div>
            <img src={chat.avatar} alt={chat.name} /> */}
            <span>{user.username}</span>
            <span className='chat-typing-text'>{typingText}</span>
        </li>)
}

export default ChatItem;
