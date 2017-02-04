// @flow

import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from './components/App';
import router from './router';
import store from './store';

sync(store, router);

new Vue({   // eslint-disable-line no-new
  router,
  store,
  el: '#app',
  render: h => h(App),
});
