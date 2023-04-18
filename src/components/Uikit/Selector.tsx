import React from 'react';
import styled from '@emotion/styled';
import { Button, ButtonProps, Flex, rem } from '@mantine/core';

import { ArrowBottomSvgr } from '../Svgr';

const ArrowBottom = styled(ArrowBottomSvgr)`
  width: ${rem(14)};
  fill: ${({ theme }) => theme.fn.rgba(theme.other.color.main, 0.4)};
`;

export const Selector: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => (
  <Button
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
    <ArrowBottom />
  </Button>
);
