import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Flex, Radio, rem, Stack } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import CommboInfo from '@/components/ComboInfo';
import { SortSvgr } from '@/components/Svgr';
import { defaultCommbo, MARKET_TYPE, SORT_BY } from '@/constants';
import { MarketTab } from '@/types/market';

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
      <Flex align="center" justify="space-between">
        <Radio.Group value={type} onChange={(val: MARKET_TYPE) => toggleType(val)}>
          {tabs.map(({ name, value }) => (
            <Radio key={value} value={value} label={name} />
          ))}
        </Radio.Group>
        <Sort sort={sort} onClick={() => toggleSort()} />
      </Flex>
      <Stack>
        <CommboInfo info={defaultCommbo} />
      </Stack>
    </>
  );
};

export default withTranslation()(Products);
