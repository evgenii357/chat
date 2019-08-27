import React from 'react';
import './Message.css';

const Message = ({ isMine, startsSequence, endsSequence, message }) => {
	return (
		<div className={[
			'message',
			`${isMine ? 'mine' : ''}`,
			`${startsSequence ? 'start' : ''}`,
			`${endsSequence ? 'end' : ''}`
		  ].join(' ')}>
			<div className="bubble-container">
				<div className="bubble">{message}</div>
			</div>
		</div>
	);
};

export default Message;