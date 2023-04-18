import { MantineThemeOverride, rem } from '@mantine/core';

import components from './components';

const theme: MantineThemeOverride = {
  fontFamily: 'PingFang SC-Semibold, PingFang SC',
  components,
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
      nav: '#36455D',
    },
  },
};

export default theme;
