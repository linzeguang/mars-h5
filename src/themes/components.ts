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
  Menu: {
    styles: (theme) => ({
      dropdown: {
        padding: '0 1rem !important',
        border: `1px solid ${theme.colors.gray[6]}`,
      },
      item: {
        height: rem(40),
        paddingLeft: 0,
        paddingRight: 0,
      },
      divder: {
        borderTop: `1px solid ${theme.colors.gray[6]}`,
      },
      itemLabel: {
        display: 'flex',
        alignItems: 'center',
        color: theme.other.color.main,
      },
    }),
  },
  Text: {
    defaultProps: (theme) => ({
      color: theme.other.color.main,
    }),
    styles: () => ({
      root: {
        fontFamily: 'PingFang SC-Regular, PingFang SC',
        fontWeight: 400,
      },
    }),
  },
  RadioGroup: {
    styles: {
      root: {
        display: 'flex',
        scrollbarWidth: 'none',
      },
    },
  },
  Radio: {
    styles: (theme) => ({
      root: {
        whiteSpace: 'nowrap',
        padding: `${rem(8)} ${rem(8)} ${rem(14)}`,
        opacity: 0.5,

        '&[data-checked]': {
          position: 'relative',
          opacity: 1,
          color: 'initial',

          ':after': {
            content: "''",
            position: 'absolute',
            left: '50%',
            bottom: rem(8),
            transform: 'translateX(-50%)',
            width: '2em',
            height: rem(4),
            backgroundColor: theme.colors[theme.primaryColor][6],
            borderRadius: rem(2),
          },
        },
      },
      inner: {
        display: 'none',
      },
      label: {
        paddingLeft: 0,
        fontSize: rem(14),
        lineHeight: theme.lineHeight,
        color: theme.other.color.main,
      },
    }),
  },
  Card: {
    styles: (theme) => ({
      root: {
        padding: '0 !important',
        borderRadius: rem(8),
        border: '1px solid #F5F8FD',
      },
      cardSection: {
        height: rem(40),
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: rem(12),
        paddingRight: rem(12),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(to right, ${theme.fn.rgba(
          theme.colors[theme.primaryColor][6],
          0.1
        )} 0%, transparent 100%)`,

        '&[data-first]': {
          marginTop: 0,
        },
      },
    }),
  },
} as MantineThemeOverride['components'];
