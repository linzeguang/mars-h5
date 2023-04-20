import { MARKET_TYPE, SORT_BY } from '@/constants';

export interface MarketTab {
  name: string;
  value: MARKET_TYPE;
}

export interface MarketParams {
  by: SORT_BY;
  type: MARKET_TYPE;
}

export interface ComboInfo {
  combo_id: number;
  combo_name: string;
  combo_name_en: string;
  combo_cycle: number;
  combo_price: number;
  combo_income_lv: string;
  fromTokens: ComboToken[];
  toTokens: ComboToken[];
}

export interface ComboToken {
  name: string;
  rate: number;
}
