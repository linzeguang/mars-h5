import styled from '@emotion/styled';
import { createPolymorphicComponent, Text, TextProps } from '@mantine/core';

export const ThinText = createPolymorphicComponent<'p', TextProps>(styled(Text)`
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
`);
export const WeightText = createPolymorphicComponent<'p', TextProps>(styled(Text)`
  font-family: PingFang SC-Semibold, PingFang SC;
  font-weight: 600;
`);
