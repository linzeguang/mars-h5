import styled from '@emotion/styled';
import { Button, ButtonProps, createPolymorphicComponent, rem } from '@mantine/core';

import { HELD_STATUS, heldStatusColor } from '@/constants';

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

export const HeldStatus = createPolymorphicComponent<
  'button',
  ButtonProps & { status: HELD_STATUS }
>(
  styled(Button)<{ status: HELD_STATUS }>`
    width: auto;
    height: ${rem(24)};
    padding: 0 ${rem(10)};
    font-size: ${rem(10)};
    background-color: ${({ status }) => heldStatusColor[status]};
  `
);

HeldStatus.defaultProps = {
  variant: 'filled',
  size: 'xs',
};
