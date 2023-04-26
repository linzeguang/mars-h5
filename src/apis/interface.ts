import { IncomeData, IncomeNum, UserComboInfo, UserCommbosParams, UsersCombo } from '@/types/hold';
import { ComboInfo, MarketParams, PrepayData, PrepayParams } from '@/types/market';
import {
  Announcement,
  Balance,
  InviteNum,
  LoginParams,
  TeamData,
  UserParams,
  Withdraw,
} from '@/types/user';

import services from './services';
import { IList } from './types';

export const signStr = (address: string) =>
  services.post<{ signstr: string }>('/pub/getSignStr', { address });

export const login = (params: LoginParams) =>
  services.post<{ token: string }>('/pub/login', { ...params });

export const newsInfo = (params: UserParams) =>
  services.post<{ list: Announcement }>('/index/newsinfo', { ...params });

export const combolist = (params: MarketParams) =>
  services.post<IList<ComboInfo>>('/Index/combolist', { ...params });

export const comboinfo = (params: PrepayParams) =>
  services.post<{ list: ComboInfo }>('/Index/comboinfo', { ...params });

export const prepay = (params: PrepayParams) =>
  services.post<PrepayData>('/index/prepay', { ...params });

export const userscombolist = (params: UserCommbosParams) =>
  services.post<{ income_data: IncomeData; income_num: IncomeNum; users_combo: UsersCombo[] }>(
    '/index/userscombolist',
    {
      ...params,
    }
  );

export const userscomboinfo = (params: { token: string; users_combo_id: number }) =>
  services.post<IList<UserComboInfo>>('/index/userscomboinfo', {
    ...params,
  });

export const userbalance = (params: UserParams) =>
  services.post<{ list: Balance }>('/index/userbalance', {
    ...params,
  });

export const invitenum = (params: UserParams) =>
  services.post<{ list: InviteNum }>('/index/invitenum', {
    ...params,
  });

export const teamdata = (params: UserParams) =>
  services.post<IList<TeamData>>('/index/teamdata', {
    ...params,
  });

export const tuijian = (params: UserParams) =>
  services.post<IList<TeamData>>('/index/tuijian', {
    ...params,
  });

export const withdraw = (params: UserParams) =>
  services.post<{ data: Withdraw }>('/index/withdraw', {
    ...params,
  });
