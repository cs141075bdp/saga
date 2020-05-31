import Vue from 'vue';
import Router from 'vue-router';
import Accounts from '../components/accounts.vue';
import Macroses from '../components/Macroses.vue';
import Battle from '../components/battle.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Accounts,
    },
    {
      path: '/play-macros',
      component: Macroses,
    },
    {
      name: 'create',
      path: '/battle',
      component: Battle,
    },
  ],
});
