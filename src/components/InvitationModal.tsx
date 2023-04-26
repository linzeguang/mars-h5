import React, { useCallback, useEffect } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useLoading, useModel } from 'foca';
import styled from '@emotion/styled';
import { Button, Modal, rem, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { appModel } from '@/models/appModel';
import { LoginParams } from '@/types/user';

type FormData = Required<Pick<LoginParams, 'p_address'>>;

const AddressInput = styled(TextInput)`
  margin-top: ${rem(44)};
  margin-bottom: ${rem(16)};
  margin-left: ${rem(16)};
  margin-right: ${rem(16)};
`;

const InvitationModal: React.FC<WithTranslation> = ({ t }) => {
  const { inviteAddress, isRegister } = useModel(appModel);
  const loading = useLoading(appModel.fetchLogin);
  const [opened, { open, close }] = useDisclosure(false);

  // const
  const form = useForm<FormData>({
    initialValues: {
      p_address: inviteAddress || '',
    },
    validate: {
      p_address: (value) => (value.trim() ? null : t('invitation.address.request')),
    },
  });

  useEffect(() => {
    if (isRegister === undefined) return;
    if (!isRegister) open();
    else close();
  }, [close, isRegister, open]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      appModel.setInviteAddress(data.p_address);
      close();
    },
    [close]
  );

  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      withCloseButton={false}
      zIndex={210}
      styles={{
        content: {
          backgroundColor: 'transparent',
          backgroundImage:
            'url(./invitation-bg.png), linear-gradient(to bottom right, #FFE7E7 0%, #FFFFFF 100%);',
          backgroundSize: '100% auto',
        },
        body: {
          padding: 0,
          overflow: 'hidden',
        },
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <AddressInput
          placeholder={t('invitation.address') as string}
          {...form.getInputProps('p_address')}
        />
        <Button sx={{ borderRadius: 0 }} size="lg" type="submit" loading={loading}>
          {t('submit')}
        </Button>
      </form>
    </Modal>
  );
};

export default withTranslation()(InvitationModal);
