import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { createStyles, Flex, Grid, rem } from '@mantine/core';

import { HeldStatus } from '@/components/Common';
import { WeightText } from '@/components/Uikit';
import { heldStatus } from '@/constants';
import { Language } from '@/i18n';
import { UsersCombo } from '@/types/hold';

const useStyles = createStyles((theme) => ({
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: `1px solid ${theme.colors.gray[6]}`,
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
}));

const Card = styled(Grid)({
  backgroundColor: '#fff',
  borderRadius: rem(8),
  border: '1px solid #F5F8FD',
});

const HeldInfo: React.FC<WithTranslation & { info: UsersCombo }> = ({ t, i18n, info }) => {
  const { classes } = useStyles();
  const { language } = i18n;
  const { combo_name, combo_name_en, order_status } = info;

  return (
    <Card columns={8} gutter={0}>
      <Grid.Col span={7}>
        <Flex className={classes.leftTitle} align="center" justify="space-between">
          <WeightText>{language === Language.EN ? combo_name_en : combo_name}</WeightText>
          <HeldStatus>{t(heldStatus[order_status])}</HeldStatus>
        </Flex>
        <Grid>
          <Grid.Col span={4} />
          <Grid.Col span={4} className={classes.leftCenter} />
          <Grid.Col span={4} />
        </Grid>
      </Grid.Col>
      <Grid.Col span={1} className={classes.right}>
        96
      </Grid.Col>
    </Card>
  );
};

export default withTranslation()(HeldInfo);
