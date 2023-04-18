import { MantineThemeOverride, rem } from '@mantine/core';

import components from './components';

const theme: MantineThemeOverride = {
  components,
  other: {
    header: {
      height: rem(56),
      background: '#fff',
      border: '#F5F8FD',
    },
    footer: {
      height: rem(64),
      background: '#fff',
    },
    pageSpacing: rem(24),
  },
};

export default theme;
