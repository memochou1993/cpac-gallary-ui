import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cache from './helpers/Cache';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    groups: [],
  },
  mutations: {
    setGroups(state, groups) {
      state.groups = groups;
    },
  },
  actions: {
    fetchGroups(context, lifetime) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/groups',
        })
          .then(({ data }) => {
            context.commit('setGroups', data.data);
            Cache.set('groups', data.data, lifetime);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
