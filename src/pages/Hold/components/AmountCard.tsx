import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useModel } from 'foca';
import styled from '@emotion/styled';
import { Flex, rem, Space, Stack, useMantineTheme } from '@mantine/core';

import { ThinText, WeightText } from '@/components/Uikit';
import { appModel } from '@/models/appModel';
import { IncomeData } from '@/types/hold';
import { toFixed } from '@/utils/format';

const Card = styled.div`
  padding-top: ${rem(18)};
  padding-bottom: ${rem(16)};
  padding-left: ${({ theme }) => theme.other.pageSpacing};
  padding-right: ${({ theme }) => theme.other.pageSpacing};
  margin-left: -${({ theme }) => theme.other.pageSpacing};
  margin-right: -${({ theme }) => theme.other.pageSpacing};
  background: linear-gradient(180deg, #36455d 0%, #5e718e 100%);
`;

// const;

const AmountCard: React.FC<WithTranslation & { incomeData?: IncomeData }> = ({ t, incomeData }) => {
  const { token } = useModel(appModel);
  const theme = useMantineTheme();
  const datas = useMemo(
    () => [
      {
        name: t('yesterday.earnings'),
        value: toFixed(incomeData?.yest_income_usdt),
      },
      {
        name: t('yesterday.rewards'),
        value: toFixed(incomeData?.combo_price_sum),
      },
      {
        name: t('total.earnings'),
        value: toFixed(incomeData?.sum_income_usdt),
      },
    ],
    [incomeData, t]
  );

  return (
    <Card>
      <ThinText color="#fff" opacity={0.5} size="xs" align="center">
        {t('total.holdings')}
      </ThinText>
      <Space h={rem(4)} />
      <Flex align="baseline" justify="center">
        <WeightText size={rem(32)} color="#fff">
          {incomeData?.sum_income_usdt || '**'}
        </WeightText>
        <WeightText size={rem(20)} color="#fff">
          &nbsp;U
        </WeightText>
      </Flex>
      <Space h={rem(16)} />
      <Flex ml={`-${theme.other.pageSpacing}`} mr={`-${theme.other.pageSpacing}`}>
        {datas.map((data) => (
          <Stack
            key={data.name}
            spacing={0}
            align="center"
            sx={{
              flex: 1,
              ':nth-of-type(3n-1)': {
                borderLeft: '1px solid',
                borderRight: '1px solid',
                borderImage:
                  'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.3),  transparent) 1',
              },
            }}
          >
            <ThinText size="xs" lh={rem(24)} color="#fff" opacity={0.5}>
              {data.name}
            </ThinText>
            <WeightText size="sm" lh={2} color="#fff">
              {token && (Number(data.value) >= 0 ? '+' : '-')} {data.value} U
            </WeightText>
          </Stack>
        ))}
      </Flex>
    </Card>
  );
};

export default withTranslation()(AmountCard);
