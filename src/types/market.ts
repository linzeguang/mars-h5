import { MARKET_TYPE, SORT_BY } from '@/constants';

export interface MarketTab {
  name: string;
  value: MARKET_TYPE;
}

export interface MarketParams {
  by: SORT_BY;
  type: MARKET_TYPE;
  token: string;
}

export interface ComboInfo {
  combo_id: number;
  combo_name: string;
  combo_name_en: string;
  combo_cycle: number;
  combo_price: number;
  combo_income_lv: string;
  token_earn: string;
  token_in: string;
}

export interface PrepayParams {
  combo_id: number;
  token: string;
}

export interface PrepayData {
  orderno: string;
  pay_price_daibi: string;
  pay_daibi_num: number;
}
