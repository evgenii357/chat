const express = require('express');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/login', (req, res) => {
	const newUser = req.body.user;
	if(!usersOnline.some(element => element.user === newUser)) {
		usersOnline.push({
			id: null,
			user: newUser
		});
		res.status(200).end();
	} else {
		res.status(500).end();
	}
});

app.post('/openchat', (req, res) => {
	const user = req.body.user;
	const anotherUser = req.body.anotherUser;

	res.status(200).json(getMessagesList(user, anotherUser));
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//=========================================================================
//=========================================================================

const io = require('socket.io')(server);

let usersOnline = [];
let messages = [];

const getMessagesList = (firstUser, secondUser) => messages.filter(message => message.sender === firstUser && message.recevier === secondUser || message.sender === secondUser && message.recevier === firstUser);
const getIdByUser = user => {
	const resultUser = usersOnline.find(value => value.user === user);
	return resultUser ? resultUser.id : null;
};
const makeResponseUsersOnline = userRequest => {
	return usersOnline.reduce((accumulator, element) => {
		element.user !== userRequest && accumulator.push({
			user: element.user,
			lastMessage: makeLastMessage(userRequest, element.user)
		});

		return accumulator;
	}, []);
};
const makeLastMessage = (firstUser, secondUser) => {
	for(let index = messages.length - 1; index >= 0; index--) {
		if(messageCondition(firstUser, secondUser, messages[index])) {
			return messages[index];
		}
	}

	return null;
};
const messageCondition = (firstUser, secondUser, message) => message.sender === firstUser && message.recevier === secondUser || message.sender === secondUser && message.recevier === firstUser ? true : false;

io.sockets.on('connection', socket => {
	socket.on('login', user => {
		usersOnline[usersOnline.findIndex(element => element.user === user)].id = socket.id;

		socket.emit('responseUsersOnline', makeResponseUsersOnline(user));
		socket.broadcast.emit('newUserOnline', user);

		console.log('SOCKET CONNECT', usersOnline);
	});

	socket.on('getMessageFromNewUserOnline', (user, newUser) => {
		socket.emit('plusUserOnline', {
			user: newUser,
			lastMessage: makeLastMessage(user, newUser)
		});
	});

	socket.on('sendMessageToAnotherUser', message => {
		const recevierUser = getIdByUser(message.recevier);
		messages.push(message);

		if(recevierUser) {			
			socket.emit('receivedNewMessage', message);
			socket.broadcast.to(recevierUser).emit('receivedNewMessage', message);
		} else {
			socket.emit('anotherUserLeaved');
		}
	});

	socket.on('disconnect', () => {
		const removeIndex = usersOnline.findIndex(element => element.id === socket.id);
		usersOnline.splice(removeIndex, 1);

		io.sockets.emit('minusUserOnline', socket.id);

		console.log('SOCKET DISCONNECT', usersOnline);
	});
});