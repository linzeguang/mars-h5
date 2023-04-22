import React, { Fragment, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Box, Burger, Header, Modal, rem, Space, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Logo, LogoWithText } from '@/components/Common';
import I18nSelector from '@/i18n/I18nSelector';
import { ChainSelector, Connector } from '@/wagmi';

const Headers: React.FC = () => {
  const { header, color } = useMantineTheme().other;
  const { address } = useAccount();
  const [opened, { toggle, open }] = useDisclosure(false);

  useEffect(() => {
    !address && open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Header height={header.height} fixed>
        <Logo />
        <Burger opened={opened} onClick={toggle} color={color.main} size="sm" />
      </Header>
      <Modal opened={opened} onClose={toggle} padding={rem(36)} zIndex={200}>
        <Box>
          <LogoWithText style={{ margin: '0 auto 4rem' }} />
          <Connector />
          <Space h={rem(24)} />
          <ChainSelector />
          <Space h={rem(148)} />
          <I18nSelector />
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Headers;
