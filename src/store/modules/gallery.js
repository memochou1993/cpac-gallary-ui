import axios from 'axios';
import Cache from '../../helpers/Cache';

export default {
  state: {
    progress: 0,
    categories: [],
    category: '',
    albums: [],
    album: null,
    photos: [],
    photo: null,
  },
  mutations: {
    setProgress(state, progress) {
      state.progress = progress;
    },
    increaseProgress(state, value) {
      state.progress += value;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setCategory(state, category) {
      state.category = category;
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setAlbum(state, album) {
      state.album = album;
    },
    setPhotos(state, photos) {
      state.photos = photos;
    },
    setPhoto(state, photo) {
      state.photo = photo;
    },
  },
  actions: {
    handleProgress(context, method) {
      switch (method) {
        case 'start':
          context.commit('setProgress', 0);
          break;
        case 'finish':
          context.commit('setProgress', 100);
          break;
        case 'none':
          context.commit('setProgress', 101);
          break;
        case 'increase':
          context.commit('increaseProgress', 1);
          break;
        default:
          break;
      }
    },
    fetchCategories(context, { resource, minutes }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: resource.url,
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
          url: resource.url,
          params: resource.params,
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
    fetchPhotos(context, { resource, minutes }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: resource.url,
          params: resource.params,
        })
          .then(({ data }) => {
            Cache.set(resource, data.data, minutes);
            context.commit('setPhotos', data.data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
