import React from 'react';
import { rem, Space } from '@mantine/core';

import AmountCard from './components/AmountCard';
import Invite from './components/Invite';
import InviteList from './components/InviteList';

const User: React.FC = () => (
  <>
    <AmountCard />
    <Space h={rem(16)} />
    <Invite />
    <Space h={rem(16)} />
    <InviteList />
  </>
);

export default User;
