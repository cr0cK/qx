import Vue from 'vue';
import Vuex from 'vuex';

import notifications from './modules/notifications';
import filters from './modules/filters';
import requestsList from './modules/requests';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    notifications,
    filters,
    requestsList,
  },
  strict: debug,
  plugins: debug ? [] : [],
});
