import BigNumber from 'bignumber.js';

export const toFixed = (num?: BigNumber.Value) => new BigNumber(num || 0).toFixed(2, 1);
