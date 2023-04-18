import styled from '@emotion/styled';
import { rem } from '@mantine/core';

import { LogoSvgr } from './Svgr';

export const Logo = styled(LogoSvgr)`
  height: ${rem(40)};
`;

export const LogoWithText = styled.img`
  display: block;
  width: ${rem(76)};
  height: ${rem(80)};
`;

LogoWithText.defaultProps = {
  src: './logo.png',
};
