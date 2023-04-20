import { useContext } from 'react';

import { PayContext } from './context';

export const usePayDrawer = () => useContext(PayContext);
