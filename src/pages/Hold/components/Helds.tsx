import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Radio, rem, Stack, useMantineTheme } from '@mantine/core';

import { Affix } from '@/components/Uikit';
import { HELD_TYPE } from '@/constants';
import { HeldType, IncomeNum, UsersCombo } from '@/types/hold';

import HeldInfo from './HeldInfo';

const Tabs = styled(Radio.Group)`
  align-items: center;
  justify-content: space-between;
  padding-top: ${rem(8)};
  padding-bottom: ${rem(8)};
  padding-left: ${({ theme }) => theme.other.pageSpacing};
  padding-right: ${({ theme }) => theme.other.pageSpacing};
  margin-left: -${({ theme }) => theme.other.pageSpacing};
  margin-right: -${({ theme }) => theme.other.pageSpacing};
`;

const Helds: React.FC<
  WithTranslation & {
    type: HELD_TYPE;
    commboList: UsersCombo[];
    incomeNum?: IncomeNum;
    toggleType: (value?: React.SetStateAction<HELD_TYPE> | undefined) => void;
  }
> = ({ t, toggleType, type, commboList, incomeNum }) => {
  const theme = useMantineTheme();

  const tabs = useMemo<HeldType[]>(
    () => [
      {
        name: `${t('all')} ${incomeNum?.sum_users_combo || ''}`,
        value: HELD_TYPE.ALL,
      },
      {
        name: `${t('progressing')} ${incomeNum?.normal_users_combo || ''}`,
        value: HELD_TYPE.PROGRESSING,
      },
      {
        name: `${t('waitpay')} ${incomeNum?.dai_users_combo || ''}`,
        value: HELD_TYPE.WAITPAY,
      },
      {
        name: `${t('expired')} ${incomeNum?.dao_users_combo || ''}`,
        value: HELD_TYPE.EXPIRED,
      },
    ],
    [t, incomeNum]
  );

  return (
    <>
      <Affix
        top={theme.other.toPx(theme.other.header.height)}
        affixedStyles={{
          '.tabs': {
            backgroundColor: theme.other.header.background,
            borderBottom: `1px solid ${theme.other.header.border}`,
          },
        }}
      >
        <Tabs className="tabs" value={type} onChange={(val: HELD_TYPE) => toggleType(val)}>
          {tabs.map(({ name, value }, index) => (
            <Radio key={index} value={value} label={name} />
          ))}
        </Tabs>
      </Affix>
      <Stack pt={rem(8)} pb={rem(16)}>
        {commboList.map((info) => (
          <HeldInfo key={info.users_combo_id} info={info} />
        ))}
      </Stack>
    </>
  );
};

export default withTranslation()(Helds);
