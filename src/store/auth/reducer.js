import {
    LOG_IN_SESSION_SUCCESS,
    LOG_IN_SESSION_ERROR,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_IN_NO_ERROR,
    LOG_OUT
} from './actions';

const initialState = {
    user: null,
    isLoaded: false,
    isError: false,
    isLogged: false
};

const authReducer = (state = initialState, action) => {   
    switch (action.type) {
        case LOG_IN_SESSION_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLogged: true
            };

        case LOG_IN_SESSION_ERROR:
            return {
                ...state,
                user: action.user
            };

        case LOG_IN_REQUEST:
            return {
                ...state,
                user: action.user,
                isLoaded: true                
            };

        case LOG_IN_SUCCESS:
            return {
                ...state,
                isLoaded: false,
                isLogged: true
            };

        case LOG_IN_ERROR:
            return {
                ...state,
                isLoaded: false,
                isError: true
            };

        case LOG_IN_NO_ERROR:
            return {
                ...state,
                isError: false
            };

        case LOG_OUT:
            return {
                ...state,
                user: '',
                isLogged: false
            };

        default:
            return state;
    }
};

export default authReducer;