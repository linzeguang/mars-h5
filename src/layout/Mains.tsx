import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

const Main = styled.main`
  min-height: 100vh;
  padding-top: ${({ theme }) => theme.other.header.height};
  padding-left: ${({ theme }) => theme.other.pageSpacing};
  padding-right: ${({ theme }) => theme.other.pageSpacing};
  padding-bottom: ${({ theme }) => theme.other.footer.height};
  box-sizing: border-box;
`;

const Mains: React.FC = () => (
  <Main>
    <Outlet />
  </Main>
);

export default Mains;
