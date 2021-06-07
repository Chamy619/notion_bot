import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {naverLoginUser} from '../../_actions/user_action';
import {useDispatch} from 'react-redux';

const NaverLoginGetProfile: React.FC = () => {
    const dispatch = useDispatch();

    const location = useLocation().hash;
    const access_token = location.split('=')[1].split('&')[0];

    const naverLogin = async () => {
        const res = await dispatch(naverLoginUser(access_token));
        const {opener} = window as any;
        
        if (!res.payload.success) {
            opener.alert('로그인에 실패했습니다.');
        } else {
            opener.location.href='/';
            opener.sessionStorage.setItem('tokenId', JSON.stringify(access_token));
        }
        window.close();
    }

    useEffect(() => {
        naverLogin();
    }, []);
    
    return(
        <div>
            <h1>잠시만 기다려주세요.</h1>        
        </div>
    );
}

export default NaverLoginGetProfile;