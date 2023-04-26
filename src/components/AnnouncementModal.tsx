import React, { useCallback, useEffect, useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useModel } from 'foca';
import { Box, Button, Modal, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { api } from '@/apis';
import { LOGIN_STATE } from '@/constants';
import { Language } from '@/i18n';
import { appModel } from '@/models/appModel';
import { Announcement } from '@/types/user';

import { ThinText, WeightText } from './Uikit';

const AnnouncementModal: React.FC<WithTranslation> = ({ i18n, t }) => {
  const { language } = i18n;
  const { loginState, token } = useModel(appModel);
  const [opened, { open, close }] = useDisclosure(false);
  const [info, setInfo] = useState<Announcement>();

  const fetchAnnouncement = useCallback(async () => {
    if (!token) return;
    const { state, list } = await api.newsInfo({ token });
    if (state === 200 && list) {
      setInfo(list);
      open();
    } else {
      close();
    }
  }, [close, open, token]);

  useEffect(() => {
    if (!loginState) return;
    if (loginState === LOGIN_STATE.SUCCESS) fetchAnnouncement();
  }, [fetchAnnouncement, loginState]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      withCloseButton={false}
      zIndex={210}
      styles={{
        content: {
          backgroundColor: '#fff',
          backgroundImage: 'url(./announcement-bg.png)',
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
        },
        body: {
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <Box>
        <WeightText align="center" color="red" size={rem(20)} pt={rem(16)} pb={rem(8)}>
          {language === Language.ZH ? info?.title : info?.title_en}
        </WeightText>
        <ThinText align="center" size="xs" opacity={0.5}>
          {info?.datetime}
        </ThinText>
        <ThinText size="sm" sx={{ textIndent: '2em', padding: rem(16) }}>
          {language === Language.ZH ? info?.des : info?.des_en}
        </ThinText>
        <Button sx={{ borderRadius: 0 }} size="lg" onClick={close}>
          {t('close')}
        </Button>
      </Box>
    </Modal>
  );
};

export default withTranslation()(AnnouncementModal);
