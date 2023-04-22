import React from 'react';
import { Image, Space } from '@mantine/core';

import MoreFeatures from './components/MoreFeatures';
import PayDrawerProvider from './components/PayDrawer';
import Products from './components/Products';

const Markets: React.FC = () => (
  <PayDrawerProvider>
    <Space h="md" />
    <Image src="./banner-logo.png" alt="mars banner" />
    <Space h="md" />
    <MoreFeatures />
    <Space h="md" />
    <Products />
  </PayDrawerProvider>
);

export default Markets;
