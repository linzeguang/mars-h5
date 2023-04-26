import React, { useEffect } from 'react';
import { useModel } from 'foca';
import { useAccount, useNetwork, useSignMessage, useSwitchNetwork } from 'wagmi';
import { bsc } from '@wagmi/core/chains';

import { appModel } from '@/models/appModel';

const WagmiHelper: React.FC = () => {
  const { signstr } = useModel(appModel);
  const { address, isConnected, connector } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: bsc.id });
  const { data, signMessage } = useSignMessage();

  useEffect(() => {
    isConnected && chain?.id !== bsc.id && switchNetwork && switchNetwork();
  }, [chain, isConnected, switchNetwork]);

  useEffect(() => {
    if (address && connector) {
      appModel.fetchSign(address);
    } else {
      appModel.clear();
    }
  }, [address, connector, isConnected]);

  useEffect(() => {
    signstr && signMessage({ message: signstr });
  }, [signMessage, signstr]);

  useEffect(() => {
    if (address && data && signstr) {
      appModel.fetchLogin({ address, signstr, hash: data });
    }
  }, [address, data, signstr]);

  return null;
};

export default WagmiHelper;
