// import { toast } from 'react-toastify';
import { defineModel } from 'foca';

import { api } from '@/apis';
import { inviteQueryKey, LOGIN_STATE } from '@/constants';
import { LoginParams, TeamData, UserParams } from '@/types/user';
import { getUrlParam } from '@/utils/format';

export interface AppState {
  isRegister?: boolean;
  token?: string;
  signstr?: string;
  signature?: string;
  inviteAddress?: string;
  loginState?: LOGIN_STATE;
  balance?: number;
  level?: string;
  usdt?: number;
  zhi_count?: number;
  team_count?: number;
  tuijian?: TeamData[];
  team?: TeamData[];
}

const initialState: AppState = {
  isRegister: undefined,
  token: undefined,
  signstr: undefined,
  signature: undefined,
  inviteAddress: undefined,
  loginState: undefined,
  balance: undefined,
  usdt: undefined,
  zhi_count: undefined,
  team_count: undefined,
  level: undefined,
};

export const appModel = defineModel('app', {
  initialState,
  reducers: {
    setInviteAddress(state, token: string) {
      state.inviteAddress = token;
    },
    setSignature(state, signature: string) {
      state.signature = signature;
    },
  },
  methods: {
    clear() {
      this.setState(initialState);
    },
    async checkRegister(address: `0x${string}`) {
      const { state } = await api.isRegister(address);
      this.setState({ isRegister: state === 200 });
    },
    async fetchSign(address: `0x${string}`) {
      const { signstr, state } = await api.signStr(address);
      if (state === 200 && signstr) {
        this.setState({ signstr });
      }
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
        list: { balance, usdt, level },
      } = await api.userbalance(parmas);
      if (state === 200) {
        this.setState({ balance, usdt, level });
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
