import React, { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';

import theme from './theme';

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <MantineProvider withNormalizeCSS theme={theme}>
    {children}
  </MantineProvider>
);

export default ThemeProvider;
