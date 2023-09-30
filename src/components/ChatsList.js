import React from 'react';
import ChatItem from './ChatItem';
import './ChatsList.css';

const ChatsList = ({ users, currentUser, chooseChat }) => {
    return (<nav>
        <ul className='chats-list'>
          {
            users?.map(user => (
                <ChatItem
                    key={user.id}
                    user={user}
                    currentUser={currentUser}
                    chooseChat={chooseChat}
                />
            ))
          }
        </ul>
      </nav>)
}

export default ChatsList;
