import React, { useEffect, useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useClipboard from 'react-use-clipboard';
import { useAccount } from 'wagmi';
import styled from '@emotion/styled';
import { Flex, rem, Space } from '@mantine/core';

import { ThinText, WeightText } from '@/components/Uikit';
import { inviteQueryKey } from '@/constants';

const LinkBox = styled(Flex)`
  height: ${rem(44)};
  padding-left: ${rem(8)};
  padding-right: ${rem(8)};
  border-radius: ${rem(8)};
  background-color: #f0f1f4;
`;

const Invite: React.FC<WithTranslation> = ({ t }) => {
  const { origin } = window.location;
  const { address } = useAccount();

  const inviteUrl = useMemo(
    () => (address ? `${origin}/?${inviteQueryKey}=${address}` : '**'),
    [address, origin]
  );

  const [isCopied, setCopied] = useClipboard(inviteUrl, { successDuration: 500 });

  useEffect(() => {
    isCopied && toast.success(t('copy.success'), {});
  }, [isCopied, t]);

  return (
    <>
      <WeightText>{t('contribution')}</WeightText>
      <Space h={rem(8)} />
      <LinkBox align="center">
        <ThinText size="sm" opacity={0.5}>
          {t('invite.link')}:
        </ThinText>
        <WeightText lineClamp={1} size="sm" sx={{ flex: 1 }} mr={rem(4)} ml={rem(4)}>
          {inviteUrl}
        </WeightText>
        <ThinText color="red" size="sm" onClick={setCopied}>
          {t('copy')}
        </ThinText>
      </LinkBox>
    </>
  );
};

export default withTranslation()(Invite);
