import React from 'react';
import classNames from 'classnames';
import './ConversationListItem.css';

const ConversationListItem = ({ type, onOpen, user, lastMessage }) => {
	const src = (type === 'chat') ? '/public/defaultChat.jpg' 
		: (type === 'user') ? '/public/defaultUser.jpg' 
		: (type === 'empty') ? '/public/empty.jpg' 
		: null;

	const handleOnOpen = () => {
		type === 'user' && onOpen && onOpen(user);
	};

	return (
		<div className={classNames('conversation-list-item', type === 'empty' ? 'conversation-list-item-disabled' : null)} onClick={handleOnOpen} >
        	<img className="conversation-photo" src={src} />
        	<div className="conversation-info">
        		<h1 className="conversation-title">{user}</h1>
        		{type !== 'empty' ? <p className="conversation-snippet">{lastMessage}</p> : null}
        	</div>
      	</div>
	);
};

export default ConversationListItem;