import React, { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { FocaProvider } from 'foca';

import AnnouncementModal from './components/AnnouncementModal';
import InvitationModal from './components/InvitationModal';
import ThemeProvider from './themes';
import WagmiProvider, { WagmiHelper } from './wagmi';

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <FocaProvider>
    <WagmiProvider>
      <WagmiHelper />
      <ThemeProvider>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          theme="colored"
          draggable
          closeOnClick
          hideProgressBar
          closeButton={false}
        />
        <AnnouncementModal />
        <InvitationModal />
        {children}
      </ThemeProvider>
    </WagmiProvider>
  </FocaProvider>
);

export default Providers;
