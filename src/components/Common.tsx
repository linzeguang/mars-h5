import styled from '@emotion/styled';
import { createPolymorphicComponent, rem, TextProps } from '@mantine/core';

import { HELD_STATUS, heldStatusColor } from '@/constants';

import { WeightText } from './Uikit';

export const Logo = styled.img`
  width: ${rem(33)};
  height: ${rem(40)};
`;

Logo.defaultProps = {
  src: './logo-real.png',
  alt: 'mars',
};

export const LogoWithText = styled.img`
  display: block;
  width: ${rem(76)};
  height: ${rem(80)};
`;

LogoWithText.defaultProps = {
  src: './logo.png',
};

export const HeldStatus = createPolymorphicComponent<'div', TextProps & { status: HELD_STATUS }>(
  styled(WeightText)<{ status: HELD_STATUS }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: ${rem(24)};
    padding: 0 ${rem(10)};
    font-size: ${rem(10)};
    color: #fff;
    border-radius: ${rem(8)};
    background-color: ${({ status }) => heldStatusColor[status]};
  `
);
