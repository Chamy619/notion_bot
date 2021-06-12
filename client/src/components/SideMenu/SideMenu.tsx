import React from 'react';
import style from 'styled-components';
import Header from './Header';

const StyledSideMenu = style.div`
    background-color: #ffc078;
    height: 100vh;
    width: 20em;
`;

const SideMenu: React.FC = () => {
    return (
        <StyledSideMenu>
            <Header />
        </StyledSideMenu>
    );
}

export default SideMenu;