import React from 'react';
import './Toolbar.css';

const Toolbar = ({ type, leftItems, title, rightItems }) => {
	const className = (type === 'chats' || type === 'chat') ? 'toolbar-chats' 
		: (type === 'users') ? 'toolbar-users' 
		: null;

	return (
		<div className={className}>
        	<div className="left-items">{leftItems}</div>
        	<h1 className="toolbar-title">{title}</h1>
        	<div className="right-items">{rightItems}</div>
    	</div>
	);
};

export default Toolbar;