import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logInRequest, logInNoError } from '../../store/auth/actions';
import * as styled from './styled';

const Login = () => {
    const [value, setValue] = useState('');
    const isLoaded = useSelector(state => state.auth.isLoaded);
    const isError = useSelector(state => state.auth.isError);
    const dispatch = useDispatch();
    
    const handleOnClick = () => {
        dispatch(logInRequest(value));
    };

    const handleOnChange = event => {
        isError && dispatch(logInNoError());
        setValue(event.target.value);
    }

    const handleOnKeyPress = event => {
        if(event.key === 'Enter') {
            dispatch(logInRequest(value));
        }
    };

    return (
        <styled.Wrapper>
            <styled.LoginWrapper>
                <styled.Input autoFocus={true} type="search" placeholder="Enter name" value={value} onChange={handleOnChange} onKeyPress={handleOnKeyPress} isError={isError} isLoaded={isLoaded} />
                <styled.Button onClick={handleOnClick}>Enter</styled.Button>
            </styled.LoginWrapper>            
        </styled.Wrapper>
    );
};

export default Login;