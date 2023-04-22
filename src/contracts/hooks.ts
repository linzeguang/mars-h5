import { utils } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { erc20Abi } from './abi';

export const marsAddress = '0x93B11027ae9d6f2443428684C0160283EbB7F801';
export const transferAddress = '0x6b3CA048463151e18631E15b2457824510887Bb5';

export const useTransfer = (amount?: number) => {
  const { config } = usePrepareContractWrite({
    address: marsAddress,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [
      transferAddress,
      utils.parseUnits(
        '10'
        // (amount || 0).toString()
      ),
    ],
  });

  return useContractWrite(config);
};
