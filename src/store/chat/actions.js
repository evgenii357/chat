export const START_LISTEN = 'START_LISTEN';
export const SET_USERS_ONLINE = 'SET_USERS_ONLINE';
export const GET_MESSAGE_FROM_NEW_USER_ONLINE = 'GET_MESSAGE_FROM_NEW_USER_ONLINE';
export const PLUS_USER_ONLINE = 'PLUS_USER_ONLINE';
export const MINUS_USER_ONLINE = 'MINUS_USER_ONLINE';

export const OPEN_CHAT_WITH_ANOTHER_USER_REQUEST = 'OPEN_CHAT_WITH_ANOTHER_USER_REQUEST';
export const OPEN_CHAT_WITH_ANOTHER_USER_SUCCESS = 'OPEN_CHAT_WITH_ANOTHER_USER_SUCCESS';
export const OPEN_CHAT_WITH_ANOTHER_USER_ERROR = 'OPEN_CHAT_WITH_ANOTHER_USER_ERROR';

export const SEND_MESSAGE_TO_ANOTHER_USER = 'SEND_MESSAGE_TO_ANOTHER_USER';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const ANOTHER_USER_LEAVED = 'ANOTHER_USER_LEAVED';

export const startListen = user => ({
	type: START_LISTEN,
	user
});

export const setUsersOnline = usersOnline => ({
	type: SET_USERS_ONLINE,
	usersOnline
});

export const getMessageFromNewUserOnline = (user, newUser) => ({
	type: GET_MESSAGE_FROM_NEW_USER_ONLINE,
	user,
	newUser
});

export const plusUserOnline = message => ({
	type: PLUS_USER_ONLINE,
	message
});

export const minusUserOnline = id => ({
	type: MINUS_USER_ONLINE,
	id
});

export const openChatWithAnotherUserRequest = (user, anotherUser) => ({
	type: OPEN_CHAT_WITH_ANOTHER_USER_REQUEST,
	user,
	anotherUser
});

export const openChatWithAnotherUserSuccess = messages => ({
	type: OPEN_CHAT_WITH_ANOTHER_USER_SUCCESS,
	messages
});

export const openChatWithAnotherUserError = () => ({
	type: OPEN_CHAT_WITH_ANOTHER_USER_ERROR
});

export const sendMessageToAnotherUser = message => ({
	type: SEND_MESSAGE_TO_ANOTHER_USER,
	message
});

export const receivedNewMessage = message => ({
	type: RECEIVED_NEW_MESSAGE,
	message
});

export const anotherUserLeaved = () => ({
	type: ANOTHER_USER_LEAVED
});