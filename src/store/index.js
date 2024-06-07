import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
    group: null
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getGroup(state) {
      return state.group;
    },
    getUserConnectionId(state) {
      return state.user ? state.user.connectionId : null;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user; 
    },
    setGroup(state, group) {
      state.group = group; 
    },
    clearUser(state) {
      state.user = null; 
    },
    clearGroup(state) {
      state.group = null; 
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
});
