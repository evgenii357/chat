import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessageToAnotherUser } from '../../store/chat/actions';
import ToolbarButton from '../ToolbarButton';

import './Compose.css';

const Compose = () => {
	const user = useSelector(state => state.auth.user);
	const anotherUser = useSelector(state => state.chat.anotherUser);
	const [value, setValue] = useState('');

	const handleOnChange = event => setValue(event.target.value);
	const dispatch = useDispatch();
	const handleOnSendMessage = () => {
		value && dispatch(sendMessageToAnotherUser({
			sender: user, 
			recevier: anotherUser, 
			message: value
		}));

		setValue('');
	};

	const handleOnKeyPress = event => event.key === 'Enter' && handleOnSendMessage();

	return (
		<div className="compose">
        	<input type="text" className="compose-input" placeholder="Type a message" value={value} onChange={handleOnChange} onKeyPress={handleOnKeyPress} />
        	<ToolbarButton type="send" onClick={handleOnSendMessage} />
      	</div>
	);
};

export default Compose;