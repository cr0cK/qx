import Vue from 'vue';
import Vuex from 'vuex';

import requestsList from './modules/requestsList';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    requestsList,
  },
  strict: debug,
  plugins: debug ? [] : [],
});
