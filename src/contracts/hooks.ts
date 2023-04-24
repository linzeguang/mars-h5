import { utils } from 'ethers';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { bsc } from '@wagmi/core/chains';

import { erc20Abi, withdrawAbi } from './abi';

export const useTransfer = (tokenAddress?: `0x${string}`) => {
  const { address } = useAccount();

  const { data: balance = '0' } = useContractRead({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { config: transferConfig } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20Abi,
    chainId: bsc.id,
    functionName: 'transfer',
    enabled: false,
    overrides: {
      gasLimit: 200000 as any,
    },
  });

  const { writeAsync: transfer, isLoading } = useContractWrite({
    ...transferConfig,
    mode: 'recklesslyUnprepared',
  });

  return { balance: utils.formatUnits(balance as any), transfer, isLoading };
};

export const useWithdraw = () => {
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_WITHDRAW_ADDRESS,
    abi: withdrawAbi,
    chainId: bsc.id,
    functionName: 'claim',
    enabled: false,
    overrides: {
      gasLimit: 200000 as any,
    },
  });

  return useContractWrite({ ...config, mode: 'recklesslyUnprepared' });
};
