import React from 'react';

import './NotOpened.css';

const NotOpened = () => {
    return (
        <div className="message-list-container-empty">
			<img className="message-list-container-empty-image" src="/public/empty.jpg" />
		</div>
    );
};

export default NotOpened;