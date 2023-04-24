import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { utils } from 'ethers';
import { useModel } from 'foca';
import styled from '@emotion/styled';
import { Box, Button, Card, createStyles, Drawer, Flex, rem, Space } from '@mantine/core';
import { useDisclosure, useToggle } from '@mantine/hooks';

import { api } from '@/apis';
import { CheckCircleSvgr } from '@/components/Svgr';
import { WeightText } from '@/components/Uikit';
import { coinInfo } from '@/constants';
import { useTransfer } from '@/contracts/hooks';
import { appModel } from '@/models/appModel';
import { ComboInfo, PrepayData } from '@/types/market';

import InfoCard from '../InfoCard';

import { PayContext } from './context';

Button.defaultProps = {
  size: 'sm',
  styles: {
    root: {
      ':active': {
        transform: 'none',
      },
    },
    label: {
      fontSize: rem(14),
    },
  },
};

const useStyles = createStyles((theme) => ({
  info: {
    flex: 1,
    lineHeight: rem(32),
    fontSize: rem(10),
    borderBottom: `1px solid ${theme.colors.gray[6]}`,
  },
}));

const CheckIcon = styled(CheckCircleSvgr)`
  width: ${rem(64)};
  height: ${rem(64)};
`;

const PayDrawerProvider: React.FC<PropsWithChildren & WithTranslation> = ({ children, t }) => {
  const { classes } = useStyles();
  const { token } = useModel(appModel);
  const [opened, { close, open, toggle }] = useDisclosure(false);
  const [loading, loadingHander] = useDisclosure(false);
  const [comboInfo, setComboInfo] = useState<ComboInfo>();
  const [prepayData, setPrepayData] = useState<PrepayData>();
  const [step, toggleStep] = useToggle([1, 2, 3]);

  const { balance, transfer, isLoading } = useTransfer(
    comboInfo && coinInfo[comboInfo.type].address
  );

  const fetchInfo = useCallback(async () => {
    if (!token || !comboInfo) return;
    try {
      loadingHander.open();
      const { state, list, msg } = await api.comboinfo({ combo_id: comboInfo.combo_id, token });
      if (state !== 200) throw msg;
      setComboInfo(list);
    } catch (error) {
      toast.error(error as string);
    }
    loadingHander.close();
  }, [comboInfo, loadingHander, token]);

  const fetchPrepay = useCallback(async () => {
    if (!token || !comboInfo) return;
    loadingHander.open();
    try {
      const { state, msg, orderno, pay_daibi_num, pay_price_daibi, type } = await api.prepay({
        combo_id: comboInfo.combo_id,
        token,
      });
      if (state !== 200) throw msg;
      setPrepayData({ orderno, pay_daibi_num, pay_price_daibi, type });
      toggleStep(2);
    } catch (error) {
      toast.error(error as string);
    }
    loadingHander.close();
  }, [comboInfo, loadingHander, toggleStep, token]);

  const fetchTransfer = useCallback(() => {
    if (!prepayData || !comboInfo) return;
    const address = coinInfo[comboInfo.type].transferAddress;
    const amount = prepayData.pay_daibi_num.toString();

    if (Number(balance) < Number(amount)) return toast.warn(t('insufficient.balance'));

    transfer?.({
      recklesslySetUnpreparedArgs: [address, utils.parseEther(amount)],
    })
      .then(() => {
        toggleStep(3);
      })
      .catch((error) => {
        toast.error(error.reason || error.error.data.message);
      });
  }, [balance, comboInfo, prepayData, t, toggleStep, transfer]);

  const handlePay = useCallback(async () => {
    if (step === 1) return fetchPrepay();
    if (step === 2) return fetchTransfer();
    return close();
  }, [close, fetchPrepay, fetchTransfer, step]);

  useEffect(() => {
    if (opened) {
      toggleStep(1);
      setComboInfo(undefined);
      fetchInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <PayContext.Provider value={{ opened, close, open, toggle, setComboInfo }}>
      {children}
      <Drawer
        size="xl"
        position="bottom"
        opened={opened}
        withCloseButton={false}
        onClose={close}
        styles={{
          content: {
            height: 'auto !important',
            borderTopLeftRadius: `${rem(8)} !important`,
            borderTopRightRadius: `${rem(8)} !important`,
          },
          title: {
            width: '100%',
          },
        }}
        title={
          <Button.Group sx={{ width: '100%' }}>
            <Button variant={step === 1 ? 'filled' : 'outline'}>{t('step')} 1</Button>
            <Button variant={step === 2 ? 'filled' : 'outline'}>{t('step')} 2</Button>
            <Button variant={step === 3 ? 'filled' : 'outline'}>{t('step')} 3</Button>
          </Button.Group>
        }
      >
        {comboInfo && step === 1 && <InfoCard inPay info={comboInfo} />}
        {step !== 1 && (
          <Box>
            <Flex align="center" justify="space-between">
              <WeightText size="sm" pl={rem(8)} opacity={0.8}>
                {t('order.number')}: {prepayData?.orderno}
              </WeightText>
              {/* <WeightText size="sm" pl={rem(8)} opacity={0.8}>
                {t('balance')}: {toFixed(Number(balance))}{' '}
                {comboInfo && coinInfo[comboInfo.type].name}
              </WeightText> */}
            </Flex>
            <Space h="md" />
            {step === 2 ? (
              <Card>
                <Flex>
                  <WeightText className={classes.info} align="center">
                    {comboInfo?.token_in}/USDT
                  </WeightText>
                  <WeightText className={classes.info} align="center">
                    {prepayData?.pay_price_daibi}
                  </WeightText>
                </Flex>
                <WeightText color="red" align="center" lh={4}>
                  {prepayData?.pay_daibi_num} {comboInfo?.token_in}
                </WeightText>
              </Card>
            ) : (
              <Flex align="center" justify="center" direction="column" mt={rem(32)} mb={rem(42)}>
                <CheckIcon />
                <WeightText size="lg" mt={rem(8)}>
                  {t('wait.block.confirm')}
                </WeightText>
              </Flex>
            )}
          </Box>
        )}
        <Space h="md" />
        <Button onClick={handlePay} loading={loading || isLoading}>
          {step === 3 ? t('close') : t('pay')}
        </Button>
      </Drawer>
    </PayContext.Provider>
  );
};

export default withTranslation()(PayDrawerProvider);
