import React, { Fragment, useCallback, useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import {
  Box,
  Burger,
  Button,
  Header,
  Menu,
  Modal,
  rem,
  Space,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { bsc } from '@wagmi/core/chains';

import { Logo, LogoWithText } from '@/components/Common';
import { BnbSvgr } from '@/components/Svgr';
import { Selector } from '@/components/Uikit';
import { Lang, languages } from '@/i18n';

const Bnb = styled(BnbSvgr)`
  width: ${rem(14)};
  height: ${rem(14)};
  margin-right: ${rem(6)};
`;

const Headers: React.FC<WithTranslation> = ({ t, i18n }) => {
  const { header, color } = useMantineTheme().other;
  const [modalVisible, modalHandle] = useDisclosure(false);
  const [drawerVisible, drawerHandle] = useDisclosure(false);

  console.log('>>>>>> drawerVisible: ', drawerVisible);

  const currentLang = useMemo(
    () => languages.find((language) => language.key === i18n.language),
    [i18n.language]
  );

  const handleLanguage = useCallback(
    (lang: Lang) => {
      i18n.changeLanguage(lang.key);
      drawerHandle.toggle();
    },
    [drawerHandle, i18n]
  );

  return (
    <Fragment>
      <Header height={header.height} fixed>
        <Logo />
        <Burger opened={modalVisible} onClick={modalHandle.toggle} color={color.main} size="sm" />
      </Header>
      <Modal opened={modalVisible} onClose={modalHandle.toggle} padding={rem(36)} zIndex={200}>
        <Box>
          <LogoWithText style={{ margin: '0 auto 4rem' }} />
          <Button>{t('connect.wallet')}</Button>
          <Space h={rem(24)} />
          <Selector>
            <Bnb />
            <Text>{bsc.name}</Text>
          </Selector>
          <Space h={rem(148)} />
          <Menu shadow="md" position="bottom">
            <Menu.Target>
              <Selector onClick={drawerHandle.toggle}>
                <Text>{currentLang?.label}</Text>
              </Selector>
            </Menu.Target>
            <Menu.Dropdown>
              {languages.map((language) => (
                <Menu.Item key={language.key} onClick={() => handleLanguage(language)}>
                  {language.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Modal>
      {/* <Drawer
        withCloseButton={false}
        position="bottom"
        opened={drawerVisible}
        zIndex={300}
        onClose={drawerHandle.toggle}
      >
        {languages.map((language) => (
          <Button key={language.key} onClick={() => handleLanguage(language)}>
            {language.label}
          </Button>
        ))}
      </Drawer> */}
    </Fragment>
  );
};

export default withTranslation()(Headers);
