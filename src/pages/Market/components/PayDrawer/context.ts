import { createContext } from 'react';

import { PayDrawerProps } from './types';

export const PayContext = createContext<PayDrawerProps>({
  opened: false,
  close: () => null,
  open: () => null,
  toggle: () => null,
  setComboInfo: () => null,
});
