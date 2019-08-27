import auth from './auth/reducer';
import chat from './chat/reducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ auth, chat });

export default appReducer;
