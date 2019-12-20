import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/main';
import Battle from '../components/battle';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      name: 'create',
      path: '/battle',
      component: Battle,
    },
  ],
});
