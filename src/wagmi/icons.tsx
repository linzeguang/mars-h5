import React from 'react';
import { bsc } from '@wagmi/core/chains';

import { BnbSvgr } from '@/components/Svgr';

export const ChainIcons: Record<number, React.ReactNode> = {
  [bsc.id]: <BnbSvgr />,
};
