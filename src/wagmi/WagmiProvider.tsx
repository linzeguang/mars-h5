import React, { PropsWithChildren } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { bsc } from '@wagmi/core/chains';
import { InjectedConnector } from '@wagmi/core/connectors/injected';
import { publicProvider } from '@wagmi/core/providers/public';

const { chains, provider, webSocketProvider } = configureChains([bsc], [publicProvider()]);

const client = createClient({
  connectors: [new InjectedConnector({ chains })],
  autoConnect: true,
  provider,
  webSocketProvider,
});

const WagmiProvider: React.FC<PropsWithChildren> = (props) => (
  <WagmiConfig client={client} {...props} />
);

export default WagmiProvider;
