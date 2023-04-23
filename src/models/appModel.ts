// import { toast } from 'react-toastify';
import { defineModel } from 'foca';

import { api } from '@/apis';
import { inviteQueryKey, LOGIN_STATE } from '@/constants';
import { LoginParams, TeamData, UserParams } from '@/types/user';
import { getUrlParam } from '@/utils/format';

export interface AppState {
  token?: string;
  inviteAddress?: string;
  loginState?: LOGIN_STATE;
  balance?: number;
  usdt?: number;
  zhi_count?: number;
  team_count?: number;
  tuijian?: TeamData[];
  team?: TeamData[];
}

const initialState: AppState = {
  token: undefined,
  inviteAddress: undefined,
  loginState: undefined,
  balance: undefined,
  usdt: undefined,
  zhi_count: undefined,
  team_count: undefined,
};

export const appModel = defineModel('app', {
  initialState,
  reducers: {
    setInviteAddress(state, token: string) {
      state.inviteAddress = token;
    },
  },
  methods: {
    clear() {
      this.setState(initialState);
    },
    async fetchLogin(parmas: LoginParams) {
      const { state, token } = await api.login(parmas);
      this.setState({ loginState: state });
      if (state === 200 && token) {
        this.fetchBalance({ token });
        this.fetchInvitenum({ token });
        this.fetchTuijian({ token });
        this.fetchTeamdata({ token });
        this.setState({
          token,
        });
      }
    },
    async fetchBalance(parmas: UserParams) {
      const {
        state,
        list: { balance, usdt },
      } = await api.userbalance(parmas);
      if (state === 200) {
        this.setState({ balance, usdt });
      }
    },
    async fetchInvitenum(parmas: UserParams) {
      const {
        state,
        list: { zhi_count, team_count },
      } = await api.invitenum(parmas);
      if (state === 200) {
        this.setState({ zhi_count, team_count });
      }
    },
    async fetchTuijian(parmas: UserParams) {
      const { state, list } = await api.tuijian(parmas);
      if (state === 200) {
        this.setState({ tuijian: list });
      }
    },
    async fetchTeamdata(parmas: UserParams) {
      const { state, list } = await api.teamdata(parmas);
      if (state === 200) {
        this.setState({ team: list });
      }
    },
  },
  events: {
    onInit() {
      const inviteAddress = getUrlParam(inviteQueryKey);
      inviteAddress && this.setInviteAddress(inviteAddress);
    },
  },
});
