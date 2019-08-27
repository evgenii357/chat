import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message';

import './MessagesList.css';

const MessagesList = () => {
    const user = useSelector(state => state.auth.user);
    const messages = useSelector(state => state.chat.messages);

    const containerScroll = useRef(null);
    useEffect(() => containerScroll.current.scrollIntoView({block: 'end', inline: 'nearest', behavior: 'smooth'}));

    return (
        <div className="message-list-container" ref={containerScroll}>
			 {messages.map((message, index) => <Message key={index} isMine={message.sender === user} startsSequence={true} endsSequence={true} message={message.message}  />)}
		</div>
    );
};

export default MessagesList;