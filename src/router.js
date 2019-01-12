import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'gallery',
      },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('./views/Gallery.vue'),
    },
  ],
});
