import React from 'react';
import { Image, Space } from '@mantine/core';

import MoreFeatures from './components/MoreFeatures';
import Products from './components/Products';

const Markets: React.FC = () => (
  <>
    <Space h="md" />
    <Image src="./banner-logo.png" alt="mars banner" />
    <Space h="md" />
    <MoreFeatures />
    <Space h="md" />
    <Products />
  </>
);

export default Markets;
