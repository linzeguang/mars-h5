import React, { PropsWithChildren, useCallback, useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Box, Button, Card, createStyles, Drawer, Flex, rem, Space } from '@mantine/core';
import { useDisclosure, useToggle } from '@mantine/hooks';

import { ComboInfo } from '@/types/market';

import CommboInfo from '../ComboInfo';
import { CheckCircleSvgr } from '../Svgr';
import { WeightText } from '../Uikit/Text';

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
  const [opened, { close, open, toggle }] = useDisclosure(false);
  const [comboInfo, setComboInfo] = useState<ComboInfo>();
  const [step, toggleStep] = useToggle([1, 2, 3]);

  const handlePay = useCallback(() => {
    if (step === 1) return toggleStep(2);
    if (step === 2) return toggleStep(3);
    return toggleStep(1);
  }, [step, toggleStep]);

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
        {comboInfo && step === 1 && <CommboInfo inPay info={comboInfo} />}
        {step !== 1 && (
          <Box>
            <WeightText size="sm" pl={rem(8)} opacity={0.8}>
              {t('order.number')}: --
            </WeightText>
            <Space h="md" />
            {step === 2 ? (
              <Card>
                <Flex>
                  <WeightText className={classes.info} align="center">
                    Mars/USDT
                  </WeightText>
                  <WeightText className={classes.info} align="center">
                    0.05
                  </WeightText>
                </Flex>
                <WeightText color="red" align="center" lh={4}>
                  800 Mars
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
        <Button onClick={handlePay}>{t('pay')}</Button>
      </Drawer>
    </PayContext.Provider>
  );
};

export default withTranslation()(PayDrawerProvider);
