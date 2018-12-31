import axios from 'axios';
import Cache from '../../helpers/Cache';

export default {
  state: {
    category: '',
    categories: [],
    albums: [],
  },
  mutations: {
    setCategory(state, category) {
      state.category = category;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
  },
  actions: {
    fetchCategories(context, { resource, minutes }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: resource,
        })
          .then(({ data }) => {
            Cache.set(resource, data.data, minutes);
            context.commit('setCategories', data.data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchAlbums(context, { resource, minutes }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: resource,
        })
          .then(({ data }) => {
            Cache.set(resource, data.data, minutes);
            context.commit('setAlbums', data.data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
