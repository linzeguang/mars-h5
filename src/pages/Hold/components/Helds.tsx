import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Radio, rem, Stack, useMantineTheme } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { Affix } from '@/components/Uikit';
import { defaultHeld, HELD_TYPE } from '@/constants';
import { HeldType } from '@/types/hold';

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

const Helds: React.FC<WithTranslation> = ({ t }) => {
  const theme = useMantineTheme();
  const [type, toggleType] = useToggle<HELD_TYPE>([
    HELD_TYPE.ALL,
    HELD_TYPE.PROGRESSING,
    HELD_TYPE.WAITPAY,
    HELD_TYPE.EXPIRED,
  ]);

  const tabs = useMemo<HeldType[]>(
    () => [
      {
        name: t('all'),
        value: HELD_TYPE.ALL,
      },
      {
        name: t('progressing'),
        value: HELD_TYPE.PROGRESSING,
      },
      {
        name: t('waitpay'),
        value: HELD_TYPE.WAITPAY,
      },
      {
        name: t('expired'),
        value: HELD_TYPE.EXPIRED,
      },
    ],
    [t]
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
        <HeldInfo info={defaultHeld} />
      </Stack>
    </>
  );
};

export default withTranslation()(Helds);
