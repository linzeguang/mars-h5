import React, { useMemo } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Box, Button, Flex, rem } from '@mantine/core';

import { AnswerSvgr, CheckInSvgr } from '@/components/Svgr';
import { ThinText, WeightText } from '@/components/Uikit/Text';

const MoreFeatures: React.FC<WithTranslation> = ({ t }) => {
  const features = useMemo<Features[]>(
    () => [
      {
        name: t('check-in'),
        icon: <CheckInSvgr />,
        onClick() {
          //
        },
      },
      {
        name: t('answer'),
        icon: <AnswerSvgr />,
        onClick() {
          //
        },
      },
    ],
    [t]
  );
  return (
    <Box>
      <WeightText ml={rem(8)} mb={rem(8)} size="md">
        {t('more.features')}
      </WeightText>
      <Flex
        align="center"
        justify="flex-start"
        gap={rem(16)}
        p={rem(8)}
        bg="#fff"
        sx={{ borderRadius: rem(8) }}
      >
        {features.map((feature) => (
          <Button
            key={feature.name}
            variant="subtle"
            styles={(theme) => ({
              root: {
                width: 'auto',
                height: 'auto',
                padding: 0,
                border: 'none',
              },
              label: {
                flexDirection: 'column',

                svg: {
                  width: rem(45),
                  height: rem(45),
                  padding: rem(12),
                  marginBottom: rem(4),
                  borderRadius: rem(8),
                  backgroundColor: theme.colors[theme.primaryColor][6],
                },
              },
            })}
          >
            {feature.icon}
            <ThinText size="sm">{feature.name}</ThinText>
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default withTranslation()(MoreFeatures);

interface Features {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}
