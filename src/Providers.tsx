import React, { PropsWithChildren } from 'react';

import ThemeProvider from './themes';
import WagmiProvider, { WagmiHelper } from './wagmi';

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <WagmiProvider>
    <WagmiHelper />
    <ThemeProvider>{children}</ThemeProvider>
  </WagmiProvider>
);

export default Providers;
