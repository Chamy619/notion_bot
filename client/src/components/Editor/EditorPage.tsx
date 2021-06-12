import React from 'react';
import LogoutButton from './LogoutButton';
import MyEditor from './MyEditor';
import SideMenu from '../SideMenu/SideMenu';
import style from 'styled-components';

const Container = style.div`
  width: 100%;
  display: flex;
`;

const EditorPage: React.FC = () => {
  return (
    <Container>
      <SideMenu />

      <MyEditor />
    </Container>
  );
}

export default EditorPage;
