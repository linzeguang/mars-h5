import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Flex, rem, Space, Stack, useMantineTheme } from '@mantine/core';

import { ThinText, WeightText } from '@/components/Uikit';

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

const AmountCard: React.FC<WithTranslation> = ({ t }) => {
  const theme = useMantineTheme();
  const datas = useMemo(
    () => [
      {
        name: t('yesterday.earnings'),
        value: 0.002,
      },
      {
        name: t('yesterday.rewards'),
        value: 0.001,
      },
      {
        name: t('total.earnings'),
        value: 0.2,
      },
    ],
    [t]
  );

  return (
    <Card>
      <ThinText color="#fff" opacity={0.5} size="xs" align="center">
        {t('total.holdings')}
      </ThinText>
      <Space h={rem(4)} />
      <Flex align="baseline" justify="center">
        <WeightText size={rem(32)} color="#fff">
          200000.0000
        </WeightText>
        <WeightText size={rem(16)} color="#fff">
          U
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
              {data.value >= 0 ? '+' : '-'} {data.value} U
            </WeightText>
          </Stack>
        ))}
      </Flex>
    </Card>
  );
};

export default withTranslation()(AmountCard);
