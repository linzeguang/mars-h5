import { UsersCombo } from '@/types/hold';
import { ComboInfo } from '@/types/market';

export enum COIN {
  MARS = 1,
  USDT = 2,
}

export const coinInfo = {
  [COIN.MARS]: {
    name: 'MARS',
    address: import.meta.env.VITE_MARS_ADDRESS,
    transferAddress: import.meta.env.VITE_MARS_TRANSFER_ADDRESS,
  },
  [COIN.USDT]: {
    name: 'USDT',
    address: import.meta.env.VITE_USDT_ADDRESS,
    transferAddress: import.meta.env.VITE_USDT_TRANSFER_ADDRESS,
  },
};

export enum LOGIN_STATE {
  SUCCESS = 200,
  HIGHER_UNREGISTER = 201,
  UN_HIGHER = 202,
}

export enum SORT_BY {
  UP = 1, // 正序
  DOWN = 2, // 倒序
}

export enum MARKET_TYPE {
  U100 = 100,
  U500 = 500,
  U1000 = 1000,
  U3000 = 3000,
  U10000 = 10000,
}

export enum HELD_TYPE {
  ALL = '0', // 全部
  PROGRESSING = '1', // 进行中
  WAITPAY = '2', // 待支付
  EXPIRED = '3', // 已过期
}

export enum HELD_STATUS {
  TEM = 0,
  WAITPAY = 1, // 待支付
  CANCELLED = 2, // 已取消
  PROGRESSING = 3, // 进行中
  EXPIRED = 4, // 已过期
}

export const heldStatus = {
  [HELD_STATUS.TEM]: '**',
  [HELD_STATUS.WAITPAY]: 'waitpay',
  [HELD_STATUS.CANCELLED]: 'cancelled',
  [HELD_STATUS.PROGRESSING]: 'progressing',
  [HELD_STATUS.EXPIRED]: 'expired',
};

export const heldStatusColor = {
  [HELD_STATUS.TEM]: '#fff',
  [HELD_STATUS.WAITPAY]: '#FC363B',
  [HELD_STATUS.CANCELLED]: 'rgba(54, 69, 93, 0.2)',
  [HELD_STATUS.PROGRESSING]: '#37E271',
  [HELD_STATUS.EXPIRED]: '#3767E2',
};

export const events = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
];

export const defaultCommbo: ComboInfo = {
  combo_id: 0,
  combo_name: '**',
  combo_name_en: '**',
  combo_cycle: '**' as unknown as number,
  combo_price: '**' as unknown as number,
  combo_income_lv: '**',
  token_earn: coinInfo[COIN.USDT].name,
  token_in: coinInfo[COIN.MARS].name,
  type: COIN.USDT,
};

export const defaultHeld: UsersCombo = {
  users_combo_id: '**' as unknown as number,
  combo_price: '**' as unknown as number,
  pay_daibi_num: '**',
  combo_income_usdt: '**',
  combo_income_benbi: '**',
  combo_name: '**',
  combo_name_en: '**',
  yest_income_usdt: '**' as unknown as number,
  yest_income_benbi: '**' as unknown as number,
  order_status: 0,
  token_earn: coinInfo[COIN.USDT].name,
  token_in: coinInfo[COIN.MARS].name,
};

export const inviteQueryKey = 'InviteAddress';

export enum INVITE_TYPE {
  TEAM,
  TUIJIAN,
}
