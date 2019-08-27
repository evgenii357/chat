import React, { useEffect } from 'react';
import ConversationList from '../ConversationList';
import MessagesContainer from '../MessagesContainer';
import './Messenger.css';

const Messenger = () => {
	return (
		<div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
          <MessagesContainer />
        </div>
      </div>
	);
};

export default Messenger;