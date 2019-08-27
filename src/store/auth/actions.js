export const LOG_IN_SESSION_REQUEST = 'LOG_IN_SESSION_REQUEST';
export const LOG_IN_SESSION_SUCCESS = 'LOG_IN_SESSION_SUCCESS';
export const LOG_IN_SESSION_ERROR = 'LOG_IN_SESSION_ERROR';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_IN_NO_ERROR = 'LOG_IN_NO_ERROR';
export const LOG_OUT = 'LOG_OUT';

export const logInSessionRequest = () => ({
	type: LOG_IN_SESSION_REQUEST
});

export const logInSessionSuccess = (user) => ({
	type: LOG_IN_SESSION_SUCCESS,
	user
});

export const logInSessionError = (user) => ({
	type: LOG_IN_SESSION_ERROR,
	user
});

export const logInRequest = user => ({
	type: LOG_IN_REQUEST,
	user
});

export const logInSuccess = () => ({
	type: LOG_IN_SUCCESS
});

export const logInError = () => ({
	type: LOG_IN_ERROR
});

export const logInNoError = () => ({
	type: LOG_IN_NO_ERROR
});

export const logOut = () => ({
	type: LOG_OUT
});