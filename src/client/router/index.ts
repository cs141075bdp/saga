import Vue from 'vue';
import Router from 'vue-router';
import Main from '../components/main.vue';
import Battle from '../components/battle.vue';

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
