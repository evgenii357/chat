import {
    SET_USERS_ONLINE,
    PLUS_USER_ONLINE,
    MINUS_USER_ONLINE,
    OPEN_CHAT_WITH_ANOTHER_USER_REQUEST,
    OPEN_CHAT_WITH_ANOTHER_USER_SUCCESS,
    OPEN_CHAT_WITH_ANOTHER_USER_ERROR,
    RECEIVED_NEW_MESSAGE,
    ANOTHER_USER_LEAVED
} from './actions';

const initialState = {
    usersOnline: [],
    open: false,
    anotherUser: null,
    isLoaded: false,
    isError: false,                    
    messages: []
};

const chatReducer = (state = initialState, action) => {   
    let newUsersOnline;

    switch (action.type) {
        case SET_USERS_ONLINE:
            return {
                ...state,
                usersOnline: action.usersOnline
            };

        case PLUS_USER_ONLINE:
            newUsersOnline = [...state.usersOnline];
            newUsersOnline.push(action.message);

            return {
                ...state,
                usersOnline: newUsersOnline
            };

        case MINUS_USER_ONLINE:
            newUsersOnline = [...state.usersOnline];
            const removeIndex = newUsersOnline.findIndex(element => element.id === action.id);
            newUsersOnline.splice(removeIndex, 1);
            
            return {
                ...state,
                usersOnline: newUsersOnline
            };

        case OPEN_CHAT_WITH_ANOTHER_USER_REQUEST: 
            return {
                ...state,
                open: true,
                anotherUser: action.anotherUser,
                isLoaded: true
            };

        case OPEN_CHAT_WITH_ANOTHER_USER_SUCCESS: 
            return {
                ...state,
                isLoaded: false,
                isError: false,
                messages: action.messages
            };

        case OPEN_CHAT_WITH_ANOTHER_USER_ERROR: 
            return {
                ...state,
                isLoaded: false,
                isError: true,
                messages: []
            };

        case RECEIVED_NEW_MESSAGE: 
            const newMessages = [...state.messages];
            newMessages.push(action.message);

            return {
                ...state,
                messages: newMessages
            };

        case ANOTHER_USER_LEAVED:
            return {
                ...state,
                open: false,
                anotherUser: null,
                isLoaded: false,
                isError: false,                    
                messages: []
            };

        default:
            return state;
    }
};

export default chatReducer;