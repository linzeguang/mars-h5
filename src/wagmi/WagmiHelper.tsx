import React, { useEffect } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { bsc } from '@wagmi/core/chains';

const WagmiHelper: React.FC = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: bsc.id });

  useEffect(() => {
    isConnected && chain?.id !== bsc.id && switchNetwork && switchNetwork();
  }, [chain, isConnected, switchNetwork]);

  return null;
};

export default WagmiHelper;
