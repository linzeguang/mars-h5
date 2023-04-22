// import { toast } from 'react-toastify';
import { defineModel } from 'foca';

import { api } from '@/apis';
import { LoginParams } from '@/apis/types';
import { LOGIN_STATE } from '@/constants';

export interface AppState {
  token?: string;
  loginState?: LOGIN_STATE;
}

const initialState: AppState = {
  token: undefined,
  loginState: undefined,
};

export const appModel = defineModel('app', {
  initialState,
  methods: {
    clear() {
      this.setState(initialState);
    },
    async fetchLogin(parmas: LoginParams) {
      const { state, token } = await api.login(parmas);
      this.setState({ loginState: state });
      if (state === 200 && token) {
        this.setState({
          token,
        });
      }
    },
  },
});
