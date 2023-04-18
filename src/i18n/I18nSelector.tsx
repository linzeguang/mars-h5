import React, { useCallback, useMemo } from 'react';
import { withTranslation } from 'react-i18next';
import { Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Selector } from '@/components/Uikit';

import { Lang, languages } from '.';

const I18nSelector = withTranslation()(({ i18n }) => {
  const [opened, { toggle }] = useDisclosure(false);

  const currentLang = useMemo(
    () => languages.find((language) => language.key === i18n.language),
    [i18n.language]
  );

  const handleLanguage = useCallback(
    (lang: Lang) => {
      i18n.changeLanguage(lang.key);
      toggle();
    },
    [i18n, toggle]
  );

  return (
    <Menu
      withinPortal
      closeOnClickOutside
      position="top"
      width="target"
      zIndex={300}
      opened={opened}
      onClose={toggle}
    >
      <Menu.Target>
        <Selector opened={opened} onClick={toggle}>
          <Text onClick={toggle}>{currentLang?.label}</Text>
        </Selector>
      </Menu.Target>
      <Menu.Dropdown>
        {languages.map((language, index) => (
          <React.Fragment key={language.key}>
            <Menu.Item
              opacity={currentLang?.key === language.key ? 1 : 0.5}
              onClick={() => handleLanguage(language)}
            >
              {language.label}
            </Menu.Item>
            {index < languages.length - 1 && <Menu.Divider />}
          </React.Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
});

export default I18nSelector;
