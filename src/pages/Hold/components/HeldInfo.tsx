import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Box, createStyles, Flex, Grid, rem } from '@mantine/core';

import { HeldStatus } from '@/components/Common';
import { MoreSvgr } from '@/components/Svgr';
import { ThinText, WeightText } from '@/components/Uikit';
import { heldStatus } from '@/constants';
import { Language } from '@/i18n';
import { UsersCombo } from '@/types/hold';
import { toFixed } from '@/utils/format';

const useStyles = createStyles((theme) => ({
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: `1px solid ${theme.colors.gray[6]}`,

    svg: {
      width: rem(19),
      height: rem(10),
    },
  },
  leftTitle: {
    height: rem(40),
    paddingLeft: rem(8),
    paddingRight: rem(8),
    borderBottom: `1px solid ${theme.colors.gray[6]}`,
  },

  leftCenter: {
    borderRight: `1px solid ${theme.colors.gray[6]}`,
    borderLeft: `1px solid ${theme.colors.gray[6]}`,
  },

  leftLabel: {
    fontSize: rem(10),
    lineHeight: rem(32),
    paddingLeft: rem(8),
    paddingRight: rem(8),
    borderBottom: `1px solid ${theme.colors.gray[6]}`,
  },
  leftValues: {
    padding: `${rem(12)} ${rem(8)}`,
  },

  usdtAmount: {
    fontSize: rem(10),
  },
  marsAmount: {
    fontSize: rem(8),
  },
}));

const Card = styled(Grid)({
  backgroundColor: '#fff',
  borderRadius: rem(8),
  border: '1px solid #F5F8FD',
});

const HeldInfo: React.FC<
  WithTranslation & { info: UsersCombo; handleDetail: (id: number) => void }
> = ({ t, i18n, info, handleDetail }) => {
  const { classes } = useStyles();
  const { language } = i18n;
  const { combo_name, combo_name_en, order_status, token_earn, token_in, users_combo_id } = info;
  const { combo_price, pay_daibi_num } = info;
  const { yest_income_usdt, yest_income_benbi } = info;
  const { combo_income_usdt, combo_income_benbi } = info;

  return (
    <Card columns={8} gutter={0}>
      <Grid.Col span={7}>
        <Flex className={classes.leftTitle} align="center" justify="space-between">
          <WeightText>{language === Language.EN ? combo_name_en : combo_name}</WeightText>
          <HeldStatus status={order_status}>{t(heldStatus[order_status])}</HeldStatus>
        </Flex>
        <Grid>
          <Grid.Col span={4}>
            <ThinText className={classes.leftLabel}>{t('amount')}</ThinText>
            <Box className={classes.leftValues}>
              <WeightText className={classes.usdtAmount}>{toFixed(combo_price)} U</WeightText>
              <ThinText className={classes.marsAmount}>
                ≈ {toFixed(pay_daibi_num)} {token_in}
              </ThinText>
            </Box>
          </Grid.Col>
          <Grid.Col span={4} className={classes.leftCenter}>
            <ThinText className={classes.leftLabel}>{t('yesterday.earnings')}</ThinText>
            <Box className={classes.leftValues}>
              <WeightText className={classes.usdtAmount}>{toFixed(yest_income_usdt)} U</WeightText>
              <ThinText className={classes.marsAmount}>
                ≈ {toFixed(yest_income_benbi)} {token_earn}
              </ThinText>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <ThinText className={classes.leftLabel}>{t('total.earnings')}</ThinText>
            <Box className={classes.leftValues}>
              <WeightText className={classes.usdtAmount}>{toFixed(combo_income_usdt)} U</WeightText>
              <ThinText className={classes.marsAmount}>
                ≈ {toFixed(combo_income_benbi)} {token_earn}
              </ThinText>
            </Box>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={1} className={classes.right} onClick={() => handleDetail(users_combo_id)}>
        <MoreSvgr />
      </Grid.Col>
    </Card>
  );
};

export default withTranslation()(HeldInfo);
