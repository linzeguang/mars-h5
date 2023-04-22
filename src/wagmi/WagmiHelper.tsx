import React, { useEffect } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { bsc } from '@wagmi/core/chains';

import { appModel } from '@/models/appModel';

const WagmiHelper: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: bsc.id });

  useEffect(() => {
    isConnected && chain?.id !== bsc.id && switchNetwork && switchNetwork();
  }, [chain, isConnected, switchNetwork]);

  useEffect(() => {
    if (address) {
      appModel.fetchLogin({ address });
    } else {
      appModel.clear();
    }
  }, [address, isConnected]);

  return null;
};

export default WagmiHelper;
