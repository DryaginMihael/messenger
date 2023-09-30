import React from 'react';
import './ChatItem.css';

const ChatItem = ({ user, chooseChat, currentUser }) => {
    return (user &&
        <li
            className={`chat-item ${user.id === currentUser?.id ? 'chat-item_selected' : ''}`}
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
        </li>)
}

export default ChatItem;
