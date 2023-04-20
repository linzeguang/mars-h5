import React, { useCallback } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { Box, Button, Card, createStyles, Flex, Grid, rem } from '@mantine/core';

import { ConvertSvgr, InfoSvgr, UpSvgr } from '@/components/Svgr';
import { ThinText, WeightText } from '@/components/Uikit/Text';
import { Language } from '@/i18n';
import { ComboInfo } from '@/types/market';

import { usePayDrawer } from './PayDrawer';

const fadeRight = keyframes`
  0% {
    transform: translateX(-10%);
    opacity: 0;
  }
  25% {
    transform: translateX(-5%);
    opacity: 0.5;
  }
  50% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;
const fadeUp = keyframes`
  0% {
    transform: translateY(-10%);
    opacity: 0;
  }
  25% {
    transform: translateY(-5%);
    opacity: 0.5;
  }
  50% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

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

    '&[data-last = true]': {
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
  animation: ${fadeUp} 4000ms infinite linear;
`;

const ConvertIcon = styled(ConvertSvgr)`
  width: ${rem(31)};
  height: ${rem(24)};
  animation: ${fadeRight} 4000ms infinite linear;
`;

const InfoCard: React.FC<{ inPay?: boolean; info: ComboInfo } & WithTranslation> = (props) => {
  const { t, i18n, info, inPay } = props;
  const { language } = i18n;
  const { combo_name, combo_name_en, combo_cycle, combo_income_lv, combo_price } = info;
  const { fromTokens, toTokens } = info;

  const { classes } = useStyles();
  const { setComboInfo, open } = usePayDrawer();

  const handleClick = useCallback(() => {
    if (inPay) return;
    setComboInfo(info);
    open();
  }, [inPay, info, open, setComboInfo]);

  return (
    <Card>
      <Card.Section>
        <Flex align="center" gap={rem(8)}>
          <InfoIcon />
          <WeightText size="md">{language === Language.EN ? combo_name_en : combo_name}</WeightText>
          <WeightText size="md">{t('day.period', { day: combo_cycle })}</WeightText>
        </Flex>
        <Flex align="center" gap={rem(8)}>
          <Flex align="center" gap={rem(4)}>
            <UpIcon />
            <WeightText size="md" color="red">
              {combo_income_lv}%
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
              data-last={fromTokens.length >= toTokens.length && index === fromTokens.length - 1}
            >
              {token.rate}% {token.name}
            </WeightText>
          ))}
        </Grid.Col>
        <Grid.Col span={2} className={classes.col}>
          <Flex h="100%" align="center" justify="center">
            <ConvertIcon />
          </Flex>
        </Grid.Col>
        <Grid.Col span={5} className={classes.col}>
          <ThinText className={classes.label}>Tokens</ThinText>
          {toTokens.map((token, index) => (
            <WeightText
              key={token.name}
              className={classes.token}
              data-last={toTokens.length >= fromTokens.length && index === toTokens.length - 1}
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
            <ThinText size={rem(10)}>{combo_cycle} Days</ThinText>
          </Flex>
        </Grid.Col>
      </Grid>
      <Box p={rem(12)}>
        <Button
          size="sm"
          sx={{ fontSize: rem(16), ...(inPay ? { height: 'auto' } : {}) }}
          variant={inPay ? 'subtle' : 'filled'}
          onClick={handleClick}
        >
          {combo_price} U
        </Button>
      </Box>
    </Card>
  );
};

export default withTranslation()(InfoCard);
