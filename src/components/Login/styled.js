import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 100vh;
    background: white;
`;

export const LoginWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    background: #f4f4f8;
    padding: 8px 10px;
    border-radius: 10px;
    border: ${props => props.isError ? '1px solid red' : props.isLoaded ? '1px solid yellow' : 'none'};
    font-size: 14px;
    cursor: pointer;
    margin-right: 20px;

    &::placeholder {
        text-align: center;
    }

    &:focus::placeholder {
        text-align: left;
    }
`;

export const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background: #007aff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    width: 167px;
    height: 33px;
    border-radius: 10px;
    margin-left: 20px;
    cursor: pointer;

    &:hover {
        background: #007affb8;
    }
`;