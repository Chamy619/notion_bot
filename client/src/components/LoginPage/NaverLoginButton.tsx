import React, { useEffect } from 'react';
import style from 'styled-components';

const { naver } = window as any;

const NaverLoginButton: React.FC = () => {
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: 'bFYiCuz1OTwiPsSA7c7z',
            callbackUrl: 'http://localhost:3000/naver-login',
            isPopup: true,
            loginButton: { color: 'green', type: 3, height: '43' }
        });
        naverLogin.init();
    }

    useEffect(() => {
        initializeNaverLogin();
    }, []);

    return <Container><div id="naverIdLogin" /></Container>;
}

const Container = style.div`
    box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;
    height: 43px;
    border-radius: 5px;
`;

export default NaverLoginButton;