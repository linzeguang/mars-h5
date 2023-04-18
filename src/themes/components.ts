import { MantineThemeOverride } from '@mantine/core';

export default {
  Header: {
    styles: (theme) => ({
      root: {
        padding: `0 ${theme.other.pageSpacing}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.other.header.background,
        borderTop: `1px solid ${theme.other.header.border}`,
        borderBottom: `1px solid ${theme.other.header.border}`,
      },
    }),
  },
} as MantineThemeOverride['components'];
