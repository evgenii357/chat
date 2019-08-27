import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openChatWithAnotherUserRequest } from '../../store/chat/actions';
import { logOut } from '../../store/auth/actions';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import './ConversationList.css';

const ConversationList = () => {
	const user = useSelector(state => state.auth.user);
	const titleForChats = user + ' - chats';
	const usersOnline = useSelector(state => state.chat.usersOnline);

	const dispatch = useDispatch();
	const handleOnOpen = anotherUser => dispatch(openChatWithAnotherUserRequest(user, anotherUser));
	const handleOnLogOut = () => dispatch(logOut());

	const makeLastMessage = lastMessage => {
		if(lastMessage) {
			const prefix = lastMessage.sender === user ? 'You: ' : `${lastMessage.sender}: `;
			return prefix + lastMessage.message;
		} else {
			return 'No messages';
		}
	};

	const renderOnlineUsers = () => {
		return usersOnline.map(value => {
			if(value.user !== user) {
				return <ConversationListItem key={value.user} type="user" onOpen={handleOnOpen} user={value.user} lastMessage={makeLastMessage(value.lastMessage)} />;
			}	
		});
	};
	
	return (
		<div className="conversation-list">
        	<Toolbar title={titleForChats} type="chats" leftItems={<ToolbarButton type="log-out" onClick={handleOnLogOut} />} rightItems={<ToolbarButton type="add" />} />
			<ConversationListItem type="empty" user="No chats created AKSDJKASJND" />
			
	
			<Toolbar title="Users online " type="users" />			
			{usersOnline.length ? renderOnlineUsers() : <ConversationListItem type="empty" user="No users online" />}
      	</div>		
	);
};

export default ConversationList;