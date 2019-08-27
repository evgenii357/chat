import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/auth/actions';
import classNames from 'classnames';
import './ToolbarButton.css';


const ToolbarButton = ({ type, onClick }) => {
	const className = (type === 'log-out') ? 'ion-ios-log-out' 
		: (type === 'add') ? 'ion-ios-add-circle-outline'
		: (type === 'send') ? 'ion-ios-send'  
		: null;

	return (
		<i className={classNames('toolbar-button', className)} onClick={() => onClick && onClick()} />
    );
};

export default ToolbarButton;