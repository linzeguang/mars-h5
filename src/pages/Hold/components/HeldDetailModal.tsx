import React, { useCallback, useEffect, useState } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useModel } from 'foca';
import { Flex, Modal, ModalProps, rem } from '@mantine/core';

import { api } from '@/apis';
import { ThinText, WeightText } from '@/components/Uikit';
import { COIN, coinInfo } from '@/constants';
import { appModel } from '@/models/appModel';
import { UserComboInfo } from '@/types/hold';

const HeldDetailModal: React.FC<WithTranslation & ModalProps & { usersComboId?: number }> = ({
  t,
  usersComboId,
  ...rest
}) => {
  const { token } = useModel(appModel);
  const [comboInfos, setComboInfos] = useState<UserComboInfo[]>([]);

  const fetchInfo = useCallback(async () => {
    if (usersComboId === undefined || !token) return;
    const { state, list } = await api.userscomboinfo({ token, users_combo_id: usersComboId });
    if (state === 200 && list) setComboInfos(list);
  }, [token, usersComboId]);

  useEffect(() => {
    rest.opened && fetchInfo();
  }, [fetchInfo, rest.opened]);

  return (
    <Modal
      closeOnClickOutside={false}
      zIndex={210}
      title={<WeightText size="lg">{t('revenue.details')}</WeightText>}
      styles={{
        content: {
          backgroundColor: '#fff',
        },
        body: {
          padding: 0,
          maxHeight: '50vh',
          overflow: 'scroll',
        },
      }}
      {...rest}
    >
      {comboInfos.map((item) => (
        <Flex
          key={item.add_time}
          align="center"
          justify="space-between"
          sx={{ padding: `${rem(8)} ${rem(16)}`, borderBottom: '1px solid #F5F8FD' }}
        >
          <WeightText color="red" size="sm">
            + {item.income_benbi} {coinInfo[COIN.MARS].name}
          </WeightText>
          <ThinText size="xs" opacity={0.5}>
            {item.add_time}
          </ThinText>
        </Flex>
      ))}
    </Modal>
  );
};

export default withTranslation()(HeldDetailModal);
