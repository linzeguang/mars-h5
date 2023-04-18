import React, { PropsWithChildren } from 'react';
import { css, Global } from '@emotion/react';

import ThemeProvider from './themes';
import WagmiProvider from './wagmi';

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <Global
      styles={css`
        .fade-exit {
          opacity: 0;
          transform: translateX(50px);
        }

        .fade-exit-active {
          opacity: 1;
          transform: translateX(0%);
        }

        .fade-enter-active,
        .fade-exit-active {
          transition: all 300ms;
        }
      `}
    />
    <WagmiProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </WagmiProvider>
  </>
);

export default Providers;
