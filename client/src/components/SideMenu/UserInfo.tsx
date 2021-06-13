import React from 'react';
import style from 'styled-components';
import { BiChevronsLeft } from 'react-icons/bi';
import { getUserInfo } from '../../utils/storage';

const Container = style.div`
    display: flex;
    align-items: center;
`;

interface Props {
    isHover: boolean;
    hideSideMenu: () => void;
}

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

const hideButton = (hover: boolean, hideSideMenu: () => void) => {
    if (hover) {
        return <BiChevronsLeft onClick={hideSideMenu} />
    } else {
        return <div></div>;
    }
}


const UserInfo: React.FC<Props> = (props) => {
    const hide = hideButton(props.isHover, props.hideSideMenu);
    return (
        <Container>
            <Image />
            {name}의 노션
            {hide}
        </Container>
    );
}

export default UserInfo;