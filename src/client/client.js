import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueRouter from 'vue-router';

import router from './router/index';
import store from './store/index';
import App from './app';

Vue.config.devtools = true;

Vue.use(VueRouter);

sync(store, router);
new Vue({ // eslint-disable-line
  functionality: true,
  el: '#app',
  store,
  router,
  render: (h) => h(App),
});
