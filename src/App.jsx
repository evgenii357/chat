import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import Messenger from './components/Messenger';
import { logInSessionRequest } from './store/auth/actions';

const useSession = (dispatch) => useEffect(() => {
    dispatch(logInSessionRequest());
}, []);

const App = () => {
    const dispatch = useDispatch();
    useSession(dispatch);

    const isLogged = useSelector(state => state.auth.isLogged);

    

    return (
        isLogged ? <Messenger /> : <Login />
    );
};

export default App;