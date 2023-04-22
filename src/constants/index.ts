import { UsersCombo } from '@/types/hold';
import { ComboInfo } from '@/types/market';

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
  ALL = 0, // 全部
  REC = 1, // 推荐
}

export enum HELD_TYPE {
  ALL = '0', // 全部
  PROGRESSING = '1', // 进行中
  WAITPAY = '2', // 待支付
  EXPIRED = '3', // 已过期
}

export enum HELD_STATUS {
  WAITPAY = 1, // 待支付
  CANCELLED = 2, // 已取消
  PROGRESSING = 3, // 进行中
  EXPIRED = 4, // 已过期
}

export const heldStatus = {
  [HELD_STATUS.WAITPAY]: 'waitpay',
  [HELD_STATUS.CANCELLED]: 'cancelled',
  [HELD_STATUS.PROGRESSING]: 'progressing',
  [HELD_STATUS.EXPIRED]: 'expired',
};

export const heldStatusColor = {
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
  combo_name: '--',
  combo_name_en: '--',
  combo_cycle: '--' as unknown as number,
  combo_price: '--' as unknown as number,
  combo_income_lv: '--',
  token_earn: 'Mars',
  token_in: 'Mars',
};

export const defaultHeld: UsersCombo = {
  users_combo_id: 18,
  combo_price: 1,
  pay_daibi_num: '205642.83951633',
  combo_income_usdt: '0.00000000',
  combo_income_benbi: '0.00000000',
  combo_name: 'Mars理财1',
  combo_name_en: 'Mars-1',
  yest_income_usdt: 0,
  yest_income_benbi: 0,
  order_status: 3,
};
