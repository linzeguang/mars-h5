import { ComboInfo } from '@/types/market';

export enum SORT_BY {
  UP = 1, // 正序
  DOWN = 2, // 倒序
}

export enum MARKET_TYPE {
  ALL = '0', // 全部
  REC = '1', // 推荐
}

export const defaultCommbo: ComboInfo = {
  combo_id: 0,
  combo_name: '--',
  combo_name_en: '--',
  combo_cycle: '--' as unknown as number,
  combo_price: '--' as unknown as number,
  combo_income_lv: '--',
  fromTokens: [
    {
      name: '--',
      rate: '--' as unknown as number,
    },
  ],
  toTokens: [
    {
      name: '--',
      rate: '--' as unknown as number,
    },
  ],
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
