import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Flex, rem, Tabs } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { SortSvgr } from '@/components/Svgr';

import InfoCard, { Info } from './InfoCard';

const Sort = styled(SortSvgr)<{ type: SortType }>(({ type }) => {
  const baseStyle = {
    width: rem(24),
    height: rem(24),
  };
  if (type === 'up') return { ...baseStyle, '#down': { opacity: 0.3 } };
  return { ...baseStyle, '#up': { opacity: 0.3 } };
});

const Products: React.FC<WithTranslation> = ({ t }) => {
  const [sort, toggle] = useToggle<SortType>(['up', 'down']);

  const tabs = useMemo<Tab[]>(
    () => [
      {
        name: t('all'),
        value: 'all',
      },
      {
        name: t('recommend'),
        value: 'recommend',
      },
    ],
    [t]
  );

  const Nodes = useMemo(() => {
    const TabNodes: React.ReactNode[] = [];
    const TabPanels: React.ReactNode[] = [];
    const infos: Info[] = [
      {
        id: 1,
        name: '嘻嘻',
        period: 30,
        earning: 3,
        fromTokens: [
          {
            name: 'BTC',
            rate: 30,
          },
          {
            name: 'BNB',
            rate: 60,
          },
          {
            name: 'DOGE',
            rate: 10,
          },
        ],
        toTokens: [
          {
            name: 'MARS',
            rate: 80,
          },
          {
            name: 'ETH',
            rate: 20,
          },
        ],
        amount: 1000,
      },
    ];

    tabs.forEach(({ name, value }) => {
      TabNodes.push(
        <Tabs.Tab key={value} value={value}>
          {name}
        </Tabs.Tab>
      );
      TabPanels.push(
        <Tabs.Panel key={value} value={value} pt={rem(8)}>
          {infos.map((info) => (
            <InfoCard key={info.id} {...info} />
          ))}
        </Tabs.Panel>
      );
    });

    return { TabNodes, TabPanels };
  }, [tabs]);

  return (
    <Tabs defaultValue="all">
      <Flex align="center" justify="space-between">
        <Tabs.List>{Nodes.TabNodes}</Tabs.List>
        <Sort type={sort} onClick={() => toggle()} />
      </Flex>
      {Nodes.TabPanels}
    </Tabs>
  );
};

export default withTranslation()(Products);

interface Tab {
  name: string;
  value: string;
}

type SortType = 'up' | 'down';
