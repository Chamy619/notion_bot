import React from 'react';
import GoogleLogin from 'react-google-login';
import { loginUser } from '../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

const LoginPage: React.FC = (props: any) => {
    const dispatch = useDispatch();

    const googleLoginSuccess = async (response: any) => {
        const profile = response.profileObj;
        const tokenId = response.tokenId;
        const body = {
            email: profile.email,
            name: profile.name,
            image: profile.imageUrl
        };
        const res = await dispatch(loginUser(tokenId, body));

        if (!res.payload.success) {
            googleLoginFailure();
        } else {
            window.sessionStorage.setItem('tokenId', JSON.stringify(tokenId));
            props.history.push('/editor');
        }
    }

    const googleLoginFailure = () => {
        alert('로그인에 실패했습니다.');
    }

    return (
        <GoogleLogin
            clientId='1054457717031-siahmpds0mfi0mqk5eb1vn91bmf40kna.apps.googleusercontent.com'
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default withRouter(LoginPage);