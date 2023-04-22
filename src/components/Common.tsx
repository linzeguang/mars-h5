import styled from '@emotion/styled';
import { Button, ButtonProps, createPolymorphicComponent, rem } from '@mantine/core';

import { HELD_STATUS } from '@/constants';

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

export const HeldStatus = createPolymorphicComponent<'button', ButtonProps>(
  styled(Button)<{ status: HELD_STATUS }>`
    width: ${rem(30)};
    height: ${rem(24)};
  `
);

HeldStatus.defaultProps = {
  variant: 'filled',
  size: 'xs',
};
