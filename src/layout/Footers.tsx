import React from 'react';
import styled from '@emotion/styled';

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.other.footer.height};
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: ${({ theme }) => theme.other.footer.background};
  box-sizing: content-box;
`;

const Footers: React.FC = () => <Footer />;

export default Footers;
