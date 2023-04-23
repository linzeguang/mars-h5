import React, { useCallback, useEffect } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { utils } from 'ethers';
import { useModel } from 'foca';
import styled from '@emotion/styled';
import { Button, Flex, rem, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { api } from '@/apis';
import { WithdrawSvgr } from '@/components/Svgr';
import { ThinText, WeightText } from '@/components/Uikit';
import { useWithdraw } from '@/contracts/hooks';
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
  const [loading, loadingHander] = useDisclosure(false);
  const { writeAsync: withdraw } = useWithdraw();

  const handleWithdraw = useCallback(async () => {
    if (!token) return;
    try {
      loadingHander.open();
      const { state, data: withdrawData, msg } = await api.withdraw({ token });
      if (state !== 200) throw msg;
      const { addr, contract_addr, time, order_no, amount, data } = withdrawData;
      await withdraw?.({
        recklesslySetUnpreparedArgs: [
          addr,
          contract_addr,
          time,
          order_no,
          utils.parseUnits(amount),
          data,
        ],
      });
    } catch (error: any) {
      toast.error(error.message || error.code || error);
    }
    loadingHander.close();
  }, [loadingHander, token, withdraw]);

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
          loading={loading}
          sx={{ width: rem(152) }}
          leftIcon={<WithdrawSvgr width={rem(17)} height={rem(17)} />}
          onClick={handleWithdraw}
        >
          {t('withdraw')}
        </Button>
      )}
    </Card>
  );
};

export default withTranslation()(AmountCard);
