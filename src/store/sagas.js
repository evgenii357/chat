import { LOG_IN_SESSION_REQUEST, LOG_IN_REQUEST, LOG_OUT, logInSessionSuccess, logInSessionError, logInSuccess, logInError } from './auth/actions';
import { START_LISTEN, OPEN_CHAT_WITH_ANOTHER_USER_REQUEST, SEND_MESSAGE_TO_ANOTHER_USER, GET_MESSAGE_FROM_NEW_USER_ONLINE, startListen, setUsersOnline, getMessageFromNewUserOnline, plusUserOnline, minusUserOnline, openChatWithAnotherUserSuccess, openChatWithAnotherUserError, receivedNewMessage, anotherUserLeaved } from './chat/actions';
import { eventChannel } from 'redux-saga';
import { fork, takeLatest, take, call, put, cancel } from 'redux-saga/effects';
import io from 'socket.io-client';
import axios from 'axios';

const fetchLogIn = user => {
	return axios.post('/login', { user });
};

function* logInSession() {
	const user = sessionStorage.getItem('user');

	try {
		if(user) {
			yield call(fetchLogIn, user);

			yield put(logInSessionSuccess(user));	
			yield put(startListen(user));	
		} else {
			yield put(logInSessionError(user));
		}
	} catch {
		yield put(logInSessionError(user));
	}
};

function* logIn(action) {
	const user = action.user;

	try {
		if(user) {
			yield call(fetchLogIn, user);	

			sessionStorage.setItem('user', user);	
			yield put(logInSuccess());	
			yield put(startListen(user));	
		} else {
			yield put(logInError());
		}
	} catch {
		yield put(logInError());
	}
};

const fetchOpenChat = (user, anotherUser) => {
	return axios.post('/openchat', { user, anotherUser });
};

function* openChat(action) {
	const user = action.user;
	const anotherUser = action.anotherUser;

	try {
		const response = yield call(fetchOpenChat, user, anotherUser);

		yield put(openChatWithAnotherUserSuccess(response.data));			
	} catch {
		yield put(openChatWithAnotherUserError());
	}
};

function* watchLogIn() {
	yield takeLatest(LOG_IN_SESSION_REQUEST, logInSession);
	yield takeLatest(LOG_IN_REQUEST, logIn);
};

function* watchChat() {
	yield takeLatest(OPEN_CHAT_WITH_ANOTHER_USER_REQUEST, openChat);
};

const connectToServer = () => {
	const socket = io('http://localhost:5000');
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
	  	});
	});
};

const subscribeToServer = (socket, user) => {
	return eventChannel(emit => {
		socket.on('responseUsersOnline', usersOnline => {									
			emit(setUsersOnline(usersOnline));
		});
		  
		socket.on('newUserOnline', newUser => {	
			emit(getMessageFromNewUserOnline(user, newUser));			
		});

		socket.on('plusUserOnline', message => {			
			emit(plusUserOnline(message));
		});
		  
		socket.on('minusUserOnline', id => {			
			emit(minusUserOnline(id));
		  });
		  
		socket.on('receivedNewMessage', message => {			
			emit(receivedNewMessage(message));
		});
		  
		socket.on('anotherUserLeaved', () => {			
			emit(anotherUserLeaved());
	  	});

	  	return () => {};
	});
};

function* readFromSocket(socket, user) {
	const channelFromServer = yield call(subscribeToServer, socket, user);
	while (true) {
		let action = yield take(channelFromServer);
	  	yield put(action);
	}
};
  
function* getMessageFromNewUserOnlineToSocket(socket) {
	while (true) {
		const { user, newUser } = yield take(GET_MESSAGE_FROM_NEW_USER_ONLINE);
		socket.emit('getMessageFromNewUserOnline', user, newUser);
	}
};

function* sendMessageToAnotherUserToSocket(socket) {
	while (true) {
		const { message } = yield take(SEND_MESSAGE_TO_ANOTHER_USER);
		socket.emit('sendMessageToAnotherUser', message);
	}
};
  
function* handleIO(socket, user) {
	yield fork(readFromSocket, socket, user);
	yield fork(sendMessageToAnotherUserToSocket, socket);
	yield fork(getMessageFromNewUserOnlineToSocket, socket);
};

function* flowIO() {
	while (true) {
		const { user } = yield take(START_LISTEN);
		const socket = yield call(connectToServer);
	  	socket.emit('login', user);
  
	  	const task = yield fork(handleIO, socket, user);
  
		yield take(LOG_OUT);
		yield put(anotherUserLeaved());
		sessionStorage.removeItem('user');
		socket.disconnect();

	  	yield cancel(task);
	}
};

function* rootSaga() {
	yield fork(watchLogIn);
	yield fork(watchChat);
	yield fork(flowIO);
};
  
export default rootSaga;