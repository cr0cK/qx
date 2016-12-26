import Vue from 'vue';
import Vuex from 'vuex';

// import * as actions from './actions';
// import * as getters from './getters';
// import cart from './modules/cart';
// import products from './modules/products';

import requestsList from './modules/requestsList';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    requestsList,
  },
  strict: debug,
  plugins: debug ? [] : [],
});
