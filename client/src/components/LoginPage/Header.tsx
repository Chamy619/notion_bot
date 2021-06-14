import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
`;

const SubTitle = styled.h3`
  text-align: center;
`;

const Header: React.FC = () => {
  return (
    <>
      <Title>우아한 테크코스</Title>
      <SubTitle>로그인 후 서비스를 이용할 수 있습니다.</SubTitle>
    </>
  );
};

export default Header;
