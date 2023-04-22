import { DEFAULT_THEME, MantineThemeOverride, rem } from '@mantine/core';

import { getRemUnit } from '@/utils/flexible';

import components from './components';

DEFAULT_THEME.colors.red.splice(6, 1, '#FC363B');
DEFAULT_THEME.colors.gray.splice(6, 1, '#F5F8FD');
DEFAULT_THEME.colors.gray.splice(4, 1, 'rgba(54, 69, 93, 0.08)');

console.log('>>>>>> DEFAULT_THEME.colors.gray: ', DEFAULT_THEME.colors.gray);

const theme: MantineThemeOverride = {
  fontSizes: { xs: rem(10), sm: rem(12), md: rem(14), lg: rem(16), xl: rem(18) },
  fontFamily: 'PingFang SC-Semibold, PingFang SC',
  lineHeight: 20 / 14,
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
      second: '#5E718E',
    },
    toPx: (value: unknown) => {
      if (typeof value === 'number') {
        return value;
      }

      if (typeof value === 'string') {
        if (value.includes('px')) {
          return Number(value.replace('px', ''));
        }

        if (value.includes('rem')) {
          return Number(value.replace('rem', '')) * parseInt(getRemUnit(), 10);
        }

        return Number(value);
      }

      return NaN;
    },
  },
};

export default theme;
