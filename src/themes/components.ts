import { MantineThemeOverride, rem } from '@mantine/core';

export default {
  Header: {
    styles: (theme) => ({
      root: {
        zIndex: 10,
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
  Modal: {
    defaultProps: (theme) => ({
      radius: 'md',
      centered: true,
      overlayProps: {
        color: theme.other.color.main,
      },
      closeButtonProps: { size: 'md' },
    }),
    styles: (theme) => ({
      inner: {
        // paddingLeft: theme.other.pageSpacing,
        // paddingRight: theme.other.pageSpacing,
      },

      body: {
        minHeight: '10vh',
      },
      close: {
        position: 'absolute',
        top: rem(6),
        right: rem(6),
        color: theme.other.color.main,
      },
    }),
  },
  Button: {
    defaultProps: {
      radius: 'md',
      size: 'md',
    },
    styles: {
      root: {
        width: '100%',
        transition: 'all 100ms',
      },
    },
  },
} as MantineThemeOverride['components'];
