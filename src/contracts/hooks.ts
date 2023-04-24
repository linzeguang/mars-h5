import { utils } from 'ethers';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';

import { erc20Abi, withdrawAbi } from './abi';

export const marsAddress = import.meta.env.VITE_MARS_ADDRESS;
export const usdtAddress = import.meta.env.VITE_USDT_ADDRESS;
export const withdrawAddress = '0x48fDaf4dCa575320226f1cAC6628ecaA98ea48Fd';

export const useTransfer = (tokenAddress?: `0x${string}`) => {
  const { address } = useAccount();
  const { config: transferConfig } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'transfer',
    enabled: false,
    suspense: true,
  });

  const { data: balance = '0' } = useContractRead({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  });

  const { writeAsync: transfer, isLoading } = useContractWrite({
    ...transferConfig,
    mode: 'recklesslyUnprepared',
  });

  return { balance: utils.formatUnits(balance as any), transfer, isLoading };
};

export const useWithdraw = () => {
  const { config } = usePrepareContractWrite({
    address: withdrawAddress,
    abi: withdrawAbi,
    functionName: 'claim',
    enabled: false,
  });

  return useContractWrite({ ...config, mode: 'recklesslyUnprepared' });
};
