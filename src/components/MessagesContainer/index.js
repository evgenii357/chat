import React from 'react';
import { useSelector } from 'react-redux';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import MessagesList from '../MessagesList';
import NotOpened from '../NotOpened';

const MessagesContainer = () => {
	const open = useSelector(state => state.chat.open);
	const anotherUser = useSelector(state => state.chat.anotherUser);
	const title = open ? `Chat with ${anotherUser}` : 'Open any chat to start messaging';

	return(
		<div>
			<Toolbar type="chat" title={title} rightItems={<ToolbarButton type="add" />} />
			{open ? <MessagesList /> : <NotOpened />}
		  	<Compose />
		</div>
	  );
};

export default MessagesContainer;