import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Button, ButtonProps, Flex, rem } from '@mantine/core';

import { ArrowBottomSvgr } from '../Svgr';

interface Props {
  opened?: boolean;
}

const ArrowBottom = styled(ArrowBottomSvgr)<Props>`
  fill: ${({ theme }) => theme.fn.rgba(theme.other.color.main, 0.4)};
  width: ${rem(14)};
  transition: all 300ms;
  transform: rotate(${({ opened }) => (opened ? '180deg' : '0')});
`;

export const Selector = forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & Props
>(({ children, opened, ...rest }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    color="gray"
    styles={(theme) => ({
      root: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
      },
      label: {
        justifyContent: 'space-between',
        width: '100%',
        fontSize: rem(12),
        color: theme.other.color.main,
      },
    })}
    {...rest}
  >
    <Flex align="center">{children}</Flex>
    <ArrowBottom opened={opened} />
  </Button>
));
