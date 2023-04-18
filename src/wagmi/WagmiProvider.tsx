import React, { PropsWithChildren } from 'react';
import { getDefaultProvider } from 'ethers';
import { createClient, WagmiConfig } from 'wagmi';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const WagmiProvider: React.FC<PropsWithChildren> = (props) => (
  <WagmiConfig client={client} {...props} />
);

export default WagmiProvider;
