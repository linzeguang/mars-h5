import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useModel } from 'foca';
import styled from '@emotion/styled';
import { Button, Flex, rem, useMantineTheme } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { TeamSvgr, TuijianSvgr } from '@/components/Svgr';
import { ThinText, WeightText } from '@/components/Uikit';
import { INVITE_TYPE } from '@/constants';
import { appModel } from '@/models/appModel';
import { TeamData } from '@/types/user';
import { desensitize } from '@/utils/format';

const List = styled.div``;

const ListItem = styled(Flex)`
  height: ${rem(30)};
  :nth-of-type(odd) {
    background-color: #f5f8fd;
  }
`;

const InviteList: React.FC<WithTranslation> = ({ t }) => {
  const theme = useMantineTheme();
  const { team_count, zhi_count, team, tuijian } = useModel(appModel);
  const [type, toggle] = useToggle<INVITE_TYPE>([INVITE_TYPE.TEAM, INVITE_TYPE.TUIJIAN]);

  const data = useMemo<TeamData[]>(() => {
    if (type === INVITE_TYPE.TEAM && team) return team;
    if (type === INVITE_TYPE.TUIJIAN && tuijian) return tuijian;
    return [{ address: '**', team_usdt: '**' as unknown as number }];
  }, [team, tuijian, type]);

  return (
    <>
      <Button.Group>
        <Button
          size="lg"
          opacity={type === INVITE_TYPE.TEAM ? 1 : 0.5}
          sx={{ borderBottomLeftRadius: 0 }}
          onClick={() => toggle(INVITE_TYPE.TEAM)}
        >
          <Flex direction="column" align="center">
            <Flex align="center" gap={rem(8)}>
              <TeamSvgr />
              <WeightText size="xs" color="#fff">
                Team
              </WeightText>
            </Flex>
            <ThinText size="xs" color="#fff">
              {team_count || '**'}
            </ThinText>
          </Flex>
        </Button>
        <Button
          size="lg"
          opacity={type === INVITE_TYPE.TUIJIAN ? 1 : 0.5}
          sx={{ borderBottomRightRadius: 0 }}
          onClick={() => toggle(INVITE_TYPE.TUIJIAN)}
        >
          <Flex direction="column" align="center">
            <Flex align="center" gap={rem(8)}>
              <TuijianSvgr />
              <WeightText size="md" color="#fff">
                {t('recommend')}
              </WeightText>
            </Flex>
            <ThinText size="xs" color="#fff">
              {zhi_count || '**'}
            </ThinText>
          </Flex>
        </Button>
      </Button.Group>
      <Flex sx={{ backgroundColor: theme.other.color.main, height: rem(30) }} align="center">
        <ThinText sx={{ flex: 1 }} size="xs" color="#fff" opacity={0.5} align="center">
          Address
        </ThinText>
        <ThinText sx={{ flex: 1 }} size="xs" color="#fff" opacity={0.5} align="center">
          {t('contribution')}
        </ThinText>
      </Flex>
      <List>
        {data.map((item, index) => (
          <ListItem key={index} align="center">
            <ThinText sx={{ flex: 0.5 }} size="xs" align="center" lineClamp={1}>
              {desensitize(item.address)}
            </ThinText>
            <WeightText sx={{ flex: 0.5 }} size="xs" align="center">
              {item.team_usdt}
            </WeightText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default withTranslation()(InviteList);
