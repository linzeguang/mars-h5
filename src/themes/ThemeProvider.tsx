import React, { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';

import GlobalStyles from './GlobalStyles';
import theme from './theme';

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <MantineProvider withNormalizeCSS theme={theme}>
    <GlobalStyles />
    {children}
  </MantineProvider>
);

export default ThemeProvider;
