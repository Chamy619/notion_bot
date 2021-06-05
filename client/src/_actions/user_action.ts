import axios from 'axios'
import {
    LOGIN_USER,
    AUTH_USER
} from './types';

interface iLoginRequest {
    email: string,
    name: string,
    image: string
};

export const loginUser = async (tokenId: string, body: iLoginRequest) => {
    const response = await axios.post('http://localhost:5000/api/user/login', body, {
        headers: {
            authorization: tokenId
        }
    });

    return ({
        type: LOGIN_USER,
        payload: response.data
    });
}

export const auth = async (tokenId: string) => {
    const response = await axios.get('http://localhost:5000/api/user/auth', {
        headers: {
            authorization: tokenId
        }
    });

    return ({
        type: AUTH_USER,
        payload: response.data
    });
}