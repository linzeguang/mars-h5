import services from './services';
import { LoginParams } from './types';

export const login = (params: LoginParams) =>
  services.post<{ token: string }>('/pub/login', { ...params });
