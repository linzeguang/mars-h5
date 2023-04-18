import { DEFAULT_THEME, MantineThemeOverride, rem } from '@mantine/core';

import components from './components';

DEFAULT_THEME.colors.red.splice(6, 1, '#FC363B');
DEFAULT_THEME.colors.gray.splice(6, 1, '#F5F8FD');

const theme: MantineThemeOverride = {
  fontSizes: { xs: rem(10), sm: rem(12), md: rem(14), lg: rem(16), xl: rem(18) },
  fontFamily: 'PingFang SC-Semibold, PingFang SC',
  components,
  colors: {
    red: DEFAULT_THEME.colors.red,
    gray: DEFAULT_THEME.colors.gray,
  },
  primaryColor: 'red',
  other: {
    pageSpacing: rem(24),
    header: {
      height: rem(56),
      background: '#fff',
      border: '#F5F8FD',
    },
    footer: {
      height: rem(64),
      background: '#fff',
    },
    color: {
      main: '#36455D',
    },
  },
};

export default theme;
