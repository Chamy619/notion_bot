import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import LoginButton from './LoginButton';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`;

const LoginPage: React.FC = () => {
    return (
        <Container>
            <Header />
            <LoginButton type={'google'} />
            <LoginButton type={'naver'} />
        </Container>
    )
}

export default LoginPage;