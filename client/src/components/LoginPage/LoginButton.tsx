import React from 'react';
import style from 'styled-components';
import GoogleLoginButton from './GoogleLoginButton';
import NaverLoginButton from './NaverLoginButton';

const Container = style.div`
    & + & {
        margin-top: 0.5em;
    }
`;

interface Props {
    type: ('google' | 'naver' | undefined);
}

const LoginButton: React.FC<Props> = props => {
    let button: Object;
    switch(props.type) {
        case 'google':
            button = <GoogleLoginButton />
            break;
        case 'naver':
            button = <NaverLoginButton />
            break;
        default:
            button = <span>오류가 발생했습니다.</span>
            break;
    }

    return (
        <Container>
            {button}
        </Container>
    );
};

export default LoginButton;