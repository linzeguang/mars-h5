import { HELD_STATUS, HELD_TYPE } from '@/constants';

export interface HeldType {
  name: string;
  value: HELD_TYPE;
}

export interface IncomeData {
  combo_price_sum: number; // 总持有U数量
  yest_income_usdt: number; // 昨日总收益U
  sum_income_usdt: number; // 累计收益U
}

export interface IncomeNum {
  sum_users_combo: number; // 全部数量
  normal_users_combo: number; // 进行中数量
  dai_users_combo: number; // 待支付数量
  dao_users_combo: number; // 到期数量
}

export interface UsersCombo {
  users_combo_id: number; // 订单ID
  combo_price: number; // 金额 U
  pay_daibi_num: string; // 金额 代币
  combo_income_usdt: string; // 累计收益U
  combo_income_benbi: string; // 累计收益 代币
  combo_name: string; // 套餐中文名字
  combo_name_en: string; // 套餐英文名字
  yest_income_usdt: number; // 昨日收益U
  yest_income_benbi: number; // 昨日收益 代币
  order_status: HELD_STATUS; // 订单状态  1 未支付 2 已取消 3 进行中 3 已到期
}
