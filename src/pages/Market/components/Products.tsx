import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Flex, px, Radio, rem, Stack, useMantineTheme } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import CommboInfo from '@/components/ComboInfo';
import { SortSvgr } from '@/components/Svgr';
import { Affix } from '@/components/Uikit';
import { defaultCommbo, MARKET_TYPE, SORT_BY } from '@/constants';
import { MarketTab } from '@/types/market';

const Tabs = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.other.pageSpacing};
  padding-right: ${({ theme }) => theme.other.pageSpacing};
  margin-left: -${({ theme }) => theme.other.pageSpacing};
  margin-right: -${({ theme }) => theme.other.pageSpacing};
  background-color: red;
`;

const Sort = styled(SortSvgr)<{
  sort: SORT_BY;
}>(({ sort }) => {
  const baseStyle = {
    width: rem(24),
    height: rem(24),
  };
  if (sort === SORT_BY.UP) return { ...baseStyle, '#down': { opacity: 0.3 } };
  return { ...baseStyle, '#up': { opacity: 0.3 } };
});

const Products: React.FC<WithTranslation> = ({ t }) => {
  const theme = useMantineTheme();
  const [type, toggleType] = useToggle<MARKET_TYPE>([MARKET_TYPE.ALL, MARKET_TYPE.REC]);
  const [sort, toggleSort] = useToggle<SORT_BY>([SORT_BY.UP, SORT_BY.DOWN]);

  const tabs = useMemo<MarketTab[]>(
    () => [
      {
        name: t('all'),
        value: MARKET_TYPE.ALL,
      },
      {
        name: t('recommend'),
        value: MARKET_TYPE.REC,
      },
    ],
    [t]
  );

  return (
    <>
      <Affix
        top={px(theme.other.header.height)}
        affixedStyles={{
          '.tabs': {
            backgroundColor: theme.other.header.background,
            borderBottom: `1px solid ${theme.other.header.border}`,
          },
        }}
      >
        <Tabs className="tabs">
          <Radio.Group value={type} onChange={(val: MARKET_TYPE) => toggleType(val)}>
            {tabs.map(({ name, value }) => (
              <Radio key={value} value={value} label={name} />
            ))}
          </Radio.Group>
          <Sort sort={sort} onClick={() => toggleSort()} />
        </Tabs>
      </Affix>
      <Stack>
        <CommboInfo info={defaultCommbo} />
        <CommboInfo info={defaultCommbo} />
        <CommboInfo info={defaultCommbo} />
        <CommboInfo info={defaultCommbo} />
        <CommboInfo info={defaultCommbo} />
      </Stack>
    </>
  );
};

export default withTranslation()(Products);
