import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import EditorPage from './components/Editor/EditorPage';
import Auth from './hoc/auth';
import NaverLoginGetProfile from './components/LoginPage/NaverLoginGetProfile';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Route exact path="/" component={Auth(LoginPage, false)} />
        <Route exact path="/editor" component={Auth(EditorPage, true)} />
        <Route path="/naver-login">
          <NaverLoginGetProfile />
        </Route>
      </Router>
    </Container>
  );
};

export default App;
