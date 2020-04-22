import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueRouter from 'vue-router';

import router from './router/index';
import store from './store/index';
import App from './app.vue';

Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.directive('focus', {
  inserted: (el) => {
    el.focus();
  },
});

sync(store, router);
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
