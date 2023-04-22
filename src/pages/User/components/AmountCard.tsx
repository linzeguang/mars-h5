import React, { useEffect } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useModel } from 'foca';
import styled from '@emotion/styled';
import { Button, Flex, rem, Space } from '@mantine/core';

import { WithdrawSvgr } from '@/components/Svgr';
import { ThinText, WeightText } from '@/components/Uikit';
import { appModel } from '@/models/appModel';
import { toFixed } from '@/utils/format';

const Card = styled.div`
  height: ${rem(184)};
  padding-top: ${rem(15)};
  padding-left: ${({ theme }) => theme.other.pageSpacing};
  padding-right: ${({ theme }) => theme.other.pageSpacing};
  margin-left: -${({ theme }) => theme.other.pageSpacing};
  margin-right: -${({ theme }) => theme.other.pageSpacing};
  background: url('./user-bg.png');
  background-size: cover;
  background-position: center;
`;

const AmountCard: React.FC<WithTranslation> = ({ t }) => {
  const { token, balance, usdt } = useModel(appModel);

  useEffect(() => {
    token && appModel.fetchBalance({ token });
  }, [token]);

  return (
    <Card>
      <ThinText color="#fff" opacity={0.5} size={rem(8)}>
        {t('balance')}
      </ThinText>
      <Space h={rem(4)} />
      <Flex align="baseline">
        <WeightText size={rem(32)} color="#fff">
          {toFixed(balance)}
        </WeightText>
        <WeightText size={rem(20)} color="#fff">
          &nbsp;MARS
        </WeightText>
      </Flex>
      <Flex align="baseline">
        <ThinText color="#fff" opacity={0.5} size="sm">
          ≈ {toFixed(usdt)} USDT
        </ThinText>
      </Flex>
      <Space h={rem(24)} />
      {token && (
        <Button
          sx={{ width: rem(152) }}
          leftIcon={<WithdrawSvgr width={rem(17)} height={rem(17)} />}
        >
          {t('withdraw')}
        </Button>
      )}
    </Card>
  );
};

export default withTranslation()(AmountCard);
