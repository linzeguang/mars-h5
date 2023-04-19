import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Box, Button, Card, createStyles, Flex, Grid, rem } from '@mantine/core';

import { ConvertSvgr, InfoSvgr, UpSvgr } from '@/components/Svgr';
import { ThinText, WeightText } from '@/components/Uikit/Text';

const useStyles = createStyles((theme) => ({
  grid: {
    borderBottom: `1px solid ${theme.colors.gray[6]}`,
  },
  col: {
    borderRight: `1px solid ${theme.colors.gray[6]}`,
  },
  label: {
    lineHeight: rem(24),
    paddingLeft: rem(8),
    paddingRight: rem(8),
    fontSize: rem(10),
    opacity: 0.5,
    borderBottom: `1px solid ${theme.colors.gray[6]}`,
  },
  token: {
    lineHeight: rem(24),
    paddingLeft: rem(8),
    paddingRight: rem(8),
    fontSize: rem(10),
    borderBottom: `1px solid ${theme.colors.gray[6]}`,

    '&[data-last]': {
      borderBottom: 'none',
    },
  },
}));

const InfoIcon = styled(InfoSvgr)`
  width: ${rem(16)};
  height: ${rem(16)};
`;

const UpIcon = styled(UpSvgr)`
  width: ${rem(18)};
  height: ${rem(18)};
`;

const InfoCard: React.FC<Info & WithTranslation> = (props) => {
  const { t } = props;
  const { name, period, earning, fromTokens, toTokens, amount } = props;

  const { classes } = useStyles();

  return (
    <Card>
      <Card.Section>
        <Flex align="center" gap={rem(8)}>
          <InfoIcon />
          <WeightText size="md">{name}</WeightText>
          <WeightText size="md">{t('day.period', { day: period })}</WeightText>
        </Flex>
        <Flex align="center" gap={rem(8)}>
          <Flex align="center" gap={rem(4)}>
            <UpIcon />
            <WeightText size="md" color="red">
              {earning}%
            </WeightText>
          </Flex>
          <ThinText size="xs">{t('daily')}</ThinText>
        </Flex>
      </Card.Section>
      <Grid className={classes.grid} columns={16} gutter="0">
        <Grid.Col span={5} className={classes.col}>
          <ThinText className={classes.label}>Tokens</ThinText>
          {fromTokens.map((token, index) => (
            <WeightText
              key={token.name}
              className={classes.token}
              data-last={fromTokens.length > toTokens.length && index === fromTokens.length - 1}
            >
              {token.rate}% {token.name}
            </WeightText>
          ))}
        </Grid.Col>
        <Grid.Col span={2} className={classes.col}>
          <Flex h="100%" align="center" justify="center">
            <ConvertSvgr width={rem(31)} height={rem(24)} />
          </Flex>
        </Grid.Col>
        <Grid.Col span={5} className={classes.col}>
          <ThinText className={classes.label}>Tokens</ThinText>
          {toTokens.map((token, index) => (
            <WeightText
              key={token.name}
              className={classes.token}
              data-last={toTokens.length > fromTokens.length && index === toTokens.length - 1}
            >
              {token.rate}% {token.name}
            </WeightText>
          ))}
        </Grid.Col>
        <Grid.Col
          span={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <ThinText className={classes.label}>{t('period')}</ThinText>
          <Flex align="center" justify="center" sx={{ flex: 1 }}>
            <ThinText size={rem(10)}>{period} Days</ThinText>
          </Flex>
        </Grid.Col>
      </Grid>
      <Box p={rem(12)}>
        <Button size="sm" sx={{ fontSize: rem(16) }}>
          {amount} U
        </Button>
      </Box>
    </Card>
  );
};

export default withTranslation()(InfoCard);

export interface Info {
  id: number;
  name: string;
  period: number;
  earning: number;
  fromTokens: Token[];
  toTokens: Token[];
  amount: number;
}

interface Token {
  name: string;
  rate: number;
}
