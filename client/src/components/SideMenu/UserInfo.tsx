import React from 'react';
import style from 'styled-components';
import { getUserInfo } from '../../utils/storage';

const Container = style.div`
    display: flex;
    align-items: center;
`;

const userInfo = getUserInfo();
const imageUrl = userInfo.image;
const name = userInfo.name;

const Image = style.div`
    background: url(${imageUrl});
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.3rem;
    margin-left: 0.3rem;
`;


const UserInfo: React.FC = () => {
    return (
        <Container>
            <Image />
            {name}의 노션
        </Container>
    );
}

export default UserInfo;