import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './appReducer';
import rootSaga from './sagas';
import { LOG_IN_SESSION_REQUEST } from './auth/actions';
import { START_LISTEN, SEND_MESSAGE_TO_ANOTHER_USER } from './chat/actions';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cancelMiddleware = () => next => action => {
    if(action.type !== START_LISTEN && action.type !== LOG_IN_SESSION_REQUEST && action.type !== SEND_MESSAGE_TO_ANOTHER_USER) {
        next(action);
    }
};


export const appStore = createStore(appReducer, composeEnhancers(applyMiddleware(sagaMiddleware, cancelMiddleware)));

sagaMiddleware.run(rootSaga);
