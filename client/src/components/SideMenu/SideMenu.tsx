import React, { useState } from 'react';
import style from 'styled-components';
import Header from './Header';
import { BiChevronsRight } from 'react-icons/bi';

const StyledSideMenu = style.div`
    background-color: #ffc078;
    height: 100vh;
    width: 20em;
`;

const SideMenu: React.FC = () => {
    const [hover, setHover] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const onMouseOverHandler = () => {
        setHover(true);
    }

    const onMouseLeaveHandler = () => {
        setHover(false);
    }

    const showSideMenu = () => {
        setCollapsed(false);
    }

    const hideSideMenu = () => {
        setCollapsed(true);
    }

    if (collapsed) {
        return <div onClick={showSideMenu}><BiChevronsRight /></div>;
    }

    return (
        <StyledSideMenu onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
            <Header isHover={hover} hideSideMenu={hideSideMenu} />
        </StyledSideMenu>
    );
}

export default SideMenu;