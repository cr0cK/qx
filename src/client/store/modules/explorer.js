/* eslint no-param-reassign: 0 */
/* eslint no-plusplus: 0 */

export const INCREMENT = 'explorer/INCREMENT';
export const UNCREMENT = 'explorer/UNCREMENT';

const initialState = {
  count: 0,
};

const getters = {
};

const actions = {
};

const mutations = {
  [INCREMENT](state) {
    state.count++;
  },
  [UNCREMENT](state) {
    state.count--;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
