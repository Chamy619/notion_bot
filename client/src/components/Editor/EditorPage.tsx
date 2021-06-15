import React from 'react';
import MyEditor from './MyEditor';
import SideMenu from '../SideMenu/SideMenu';
import styled from 'styled-components';

const Container = styled.div`
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
};

export default EditorPage;
