import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useModel } from 'foca';
import styled from '@emotion/styled';
import { Flex, Radio, rem, Stack, useMantineTheme } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { api } from '@/apis';
import { SortSvgr } from '@/components/Svgr';
import { Affix } from '@/components/Uikit';
import { defaultCommbo, MARKET_TYPE, SORT_BY } from '@/constants';
import { appModel } from '@/models/appModel';
import { ComboInfo, MarketTab } from '@/types/market';

import InfoCard from './InfoCard';

const Tabs = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.other.pageSpacing};
  padding-right: ${({ theme }) => theme.other.pageSpacing};
  margin-left: -${({ theme }) => theme.other.pageSpacing};
  margin-right: -${({ theme }) => theme.other.pageSpacing};
`;

const Sort = styled(SortSvgr)<{
  sort: SORT_BY;
}>(({ sort }) => {
  const baseStyle = {
    marginLeft: rem(8),
    width: rem(24),
    height: rem(24),
  };
  if (sort === SORT_BY.UP) return { ...baseStyle, '#down': { opacity: 0.3 } };
  return { ...baseStyle, '#up': { opacity: 0.3 } };
});

const Products: React.FC<WithTranslation> = () => {
  const theme = useMantineTheme();
  const { token } = useModel(appModel);
  const [type, toggleType] = useState<MARKET_TYPE>(MARKET_TYPE.U100);
  const [sort, toggleSort] = useToggle<SORT_BY>([SORT_BY.UP, SORT_BY.DOWN]);
  const [commboList, setCommboList] = useState<ComboInfo[]>([defaultCommbo]);

  const tabs = useMemo<MarketTab[]>(
    () => [
      {
        name: '100 U',
        value: MARKET_TYPE.U100,
      },
      {
        name: '500 U',
        value: MARKET_TYPE.U500,
      },
      {
        name: '1000 U',
        value: MARKET_TYPE.U1000,
      },
      {
        name: '3000 U',
        value: MARKET_TYPE.U3000,
      },
      {
        name: '10000 U',
        value: MARKET_TYPE.U10000,
      },
    ],
    []
  );

  const fetchCommbos = useCallback(async () => {
    if (!token) return setCommboList([defaultCommbo]);
    try {
      const { state, msg, list } = await api.combolist({ by: sort, type, token });
      if (state !== 200) throw msg;
      setCommboList(list);
    } catch (error) {
      toast.error(error as string);
    }
  }, [sort, token, type]);

  useEffect(() => {
    fetchCommbos();
  }, [fetchCommbos]);

  return (
    <>
      <Affix
        top={theme.other.toPx(theme.other.header.height)}
        affixedStyles={{
          '.tabs': {
            backgroundColor: theme.other.header.background,
            borderBottom: `1px solid ${theme.other.header.border}`,
          },
        }}
      >
        <Tabs className="tabs">
          <Radio.Group
            value={Number(type) as unknown as string}
            onChange={(val) => toggleType(val as unknown as MARKET_TYPE)}
            sx={{
              flex: 1,
              overflowX: 'scroll',
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {tabs.map(({ name, value }) => (
              <Radio
                key={value}
                value={value}
                label={name}
                onClick={(ev) =>
                  (
                    (ev.target as HTMLInputElement).parentNode?.parentNode
                      ?.parentNode as HTMLDivElement
                  ).scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                  })
                }
              />
            ))}
          </Radio.Group>
          <Sort sort={sort} onClick={() => toggleSort()} />
        </Tabs>
      </Affix>
      <Stack pt={rem(8)} pb={rem(16)}>
        {commboList.map((info) => (
          <InfoCard key={info.combo_id} info={info} />
        ))}
      </Stack>
    </>
  );
};

export default withTranslation()(Products);
