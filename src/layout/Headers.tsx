import React from 'react';
import { Burger, Header, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Logo } from '@/components/Common';

const Headers: React.FC = () => {
  const { height } = useMantineTheme().other.header;
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Header height={height} fixed>
      <Logo />
      <Burger opened={opened} onClick={toggle} color="#36455D" size="sm" />
    </Header>
  );
};

export default Headers;
