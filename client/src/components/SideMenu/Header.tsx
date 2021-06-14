import React from 'react';
import style from 'styled-components';
import { getTokenId } from '../../utils/storage';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../_actions/user_action';
import UserInfo from './UserInfo';
import { Button } from '../Fragments/Button';
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Container = style.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

interface Props {
  history: History;
  isHover: boolean;
  hideSideMenu: () => void;
}

const Header: React.FC<Props & RouteComponentProps> = (props) => {
  const dispatch = useDispatch();

  const onClick = async () => {
    const tokenId = getTokenId();

    const res = await dispatch(logoutUser(tokenId));

    if (!res.payload.success) {
      alert('로그아웃에 실패했습니다.');
    } else {
      props.history.push('/');
    }
  };

  return (
    <Container>
      <UserInfo isHover={props.isHover} hideSideMenu={props.hideSideMenu} />
      <Button color={'red'} size={'small'} onClick={onClick}>
        로그아웃
      </Button>
    </Container>
  );
};

export default withRouter(Header);
