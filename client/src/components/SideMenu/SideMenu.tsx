import React from 'react';
import style from 'styled-components';
import { Button } from '../Fragments/Button';

const StyledSideMenu = style.div`
    background-color: #ffc078;
    height: 100vh;
`;

const SideMenu: React.FC = () => {
    return <StyledSideMenu><Button color={'red'} size={'medium'}>로그아웃</Button></StyledSideMenu>
}

export default SideMenu;