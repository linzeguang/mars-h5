import React, { useCallback } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useAccount, useConnect } from 'wagmi';
import { Button, Stack, useMantineTheme } from '@mantine/core';

const Connector: React.FC<WithTranslation> = ({ t }) => {
  const theme = useMantineTheme();
  const { connect, connectors } = useConnect();
  const { address, isConnected, isConnecting } = useAccount();

  const handleConnect = useCallback(
    (connector: (typeof connectors)[number]) => {
      if (isConnected || isConnecting) return;
      connect({ connector });
    },
    [connect, isConnected, isConnecting]
  );
  return (
    <Stack>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          color={isConnected ? 'gray' : 'red'}
          sx={isConnected ? { backgroundColor: theme.other.color.main } : undefined}
          onClick={() => handleConnect(connector)}
        >
          {isConnecting ? t('connecting') : address || t('connect.wallet')}
        </Button>
      ))}
    </Stack>
  );
};

export default withTranslation()(Connector);
