export interface LoginParams {
  address: string;
  p_address?: string;
  signstr: string; // 要签名的字符串
  hash: string; // 签名后获取的hash
}

export interface UserParams {
  token: string;
}

export interface Announcement {
  add_time: number;
  datetime: string;
  des: string;
  des_en: string;
  id: number;
  title: string;
  title_en: string;
}

export interface Balance {
  balance: number;
  usdt: number;
  level: string;
}

export interface InviteNum {
  team_count: number;
  zhi_count: number;
}

export interface TeamData {
  address: string;
  team_usdt: number;
}

export interface Withdraw {
  addr: string;
  amount: string;
  contract_addr: string;
  data: string;
  order_no: string;
  time: number;
}
