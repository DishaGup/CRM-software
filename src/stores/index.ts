// src/store/index.ts

import { createStore } from 'vuex';
// import {auth} from './modules/auth';
// import {user} from './modules/user';

export interface RootState {
  auth: {
    token: string | null;
    user: any | null;
  };
  user: {
    users: any[];
    user: any | null;
    loading: boolean;
  };
}

const store = createStore<RootState>({
  modules: {
    // auth,
    // user,
  },
});

export default store;
