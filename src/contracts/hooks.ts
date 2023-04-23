import { utils } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { erc20Abi, withdrawAbi } from './abi';

export const marsAddress = '0x93B11027ae9d6f2443428684C0160283EbB7F801';
export const transferAddress = '0x6b3CA048463151e18631E15b2457824510887Bb5';
export const withdrawAddress = '0x48fDaf4dCa575320226f1cAC6628ecaA98ea48Fd';

export const useTransfer = (amount?: number) => {
  const { config } = usePrepareContractWrite({
    address: marsAddress,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [transferAddress, utils.parseUnits((amount || 0).toString())],
    enabled: false,
  });

  return useContractWrite({ ...config, mode: 'recklesslyUnprepared' });
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
