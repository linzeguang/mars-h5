import React, { useCallback } from 'react';
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi';
import styled from '@emotion/styled';
import { Flex, Menu, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Selector } from '@/components/Uikit';

import { ChainIcons } from './icons';

const Icon = styled(Flex)`
  margin-right: ${rem(6)};

  svg {
    width: ${rem(14)};
    height: ${rem(14)};
  }
`;

const ChainSelector = () => {
  const { chain, chains } = useNetwork();
  const [opened, { toggle }] = useDisclosure(false);
  const { switchNetwork } = useSwitchNetwork();

  const handleChain = useCallback(
    (targetChain: Chain) => {
      if (chain?.id === targetChain.id || !switchNetwork) return;
      switchNetwork && switchNetwork(targetChain.id);
    },
    [chain?.id, switchNetwork]
  );

  return (
    <Menu
      withinPortal
      closeOnClickOutside
      position="bottom"
      width="target"
      zIndex={300}
      opened={opened}
      onClose={toggle}
    >
      <Menu.Target>
        <Selector opened={opened} onClick={toggle}>
          {chain && <Icon>{ChainIcons[chain.id]}</Icon>}
          <Text>{chain?.name}</Text>
        </Selector>
      </Menu.Target>
      <Menu.Dropdown>
        {chains.map((otherChain, index) => (
          <React.Fragment key={otherChain.id}>
            <Menu.Item
              opacity={otherChain.id === chain?.id ? 1 : 0.5}
              onClick={() => handleChain(otherChain)}
            >
              {ChainIcons[otherChain.id] && <Icon>{ChainIcons[otherChain.id]}</Icon>}
              <Text>{otherChain.name}</Text>
            </Menu.Item>
            {index < chains.length - 1 && <Menu.Divider />}
          </React.Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ChainSelector;
