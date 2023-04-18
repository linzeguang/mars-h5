import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Flex, rem, Text, useMantineTheme } from '@mantine/core';

import { HoldSvgr, MarketSvgr, UserSvgr } from '@/components/Svgr';
import { RouterType, withRouter } from '@/HOC';

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.other.footer.height};
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: ${({ theme }) => theme.other.footer.background};
  box-sizing: content-box;
`;

const Nav = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footers: React.FC<WithTranslation & RouterType> = ({ t, pathname }) => {
  const theme = useMantineTheme();
  const navs = useMemo(
    () => [
      {
        name: t('market'),
        Icon: MarketSvgr,
        href: '/market',
      },
      {
        name: t('hold'),
        Icon: HoldSvgr,
        href: '/hold',
      },
      {
        name: t('user'),
        Icon: UserSvgr,
        href: '/user',
      },
    ],
    []
  );

  return (
    <Footer>
      <Flex sx={{ boxSizing: 'border-box', padding: '0 1rem', height: '100%' }}>
        {navs.map(({ href, name, Icon }) => (
          <Nav key={href} to={href} style={{ opacity: pathname === href ? 1 : 0.5 }}>
            <Icon height={rem(24)} width={rem(24)} />
            <Text size="xs" color={theme.other.color.nav} weight={600} sx={{ lineHeight: 2 }}>
              {name}
            </Text>
          </Nav>
        ))}
      </Flex>
    </Footer>
  );
};

export default withTranslation()(withRouter(Footers));
