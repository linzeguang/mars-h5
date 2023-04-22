export interface LoginParams {
  address: string;
  p_address?: string;
}

export interface UserParams {
  token: string;
}

export interface Balance {
  balance: number;
  usdt: number;
}

export interface InviteNum {
  team_count: number;
  zhi_count: number;
}

export interface TeamData {
  address: string;
  team_usdt: number;
}
