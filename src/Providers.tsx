import React, { PropsWithChildren } from 'react';

import ThemeProvider from './themes';
import WagmiProvider from './wagmi';

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <WagmiProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </WagmiProvider>
);

export default Providers;
