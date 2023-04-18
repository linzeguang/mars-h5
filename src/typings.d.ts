import '@emotion/react';

import type { MantineTheme } from '@mantine/core';

import { I18nKeys, Language } from './i18n';

declare module '@emotion/react' {
  export interface Theme extends MantineTheme {}
}

declare module '@mantine/core' {
  interface LayoutConfig {
    height: string;
    background: string;
    border?: string;
  }

  interface MantineThemeOther {
    header: LayoutConfig;
    footer: LayoutConfig;
    pageSpacing: string;
    color: {
      main: string;
    };
  }
}

export type I18nT = {
  (key: I18nKeys): string;
};

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TFunction extends I18nT {}
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)[Language.EN];
  }
}
