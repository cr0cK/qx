/* eslint no-param-reassign: 0 */

// @flow

import axios from 'axios';

import { PUSH_NOTIFICATION } from './notifications';

export const GET_FILTERS_QUERY = 'filters/GET_FILTERS_QUERY';
export const SET_FILTERS_QUERY = 'filters/SET_FILTERS_QUERY';


type State = {
  query: string,
};

const initialState: State = {
  query: '',
};

/**
 * GETTERS
 */

const getters = {
  filtersQuery: (state: State) => state.query,
};

/**
 * ACTIONS
 */

const actions: VueXActions = {
  /**
   * Get th filter query save in the DB.
   */
  [GET_FILTERS_QUERY]({ commit }) {
    return axios.get('/qx/api/filters/query')
      .then(response => commit(SET_FILTERS_QUERY, response.data.query))
      .catch(error => commit(PUSH_NOTIFICATION, {
        message: error,
      }));
  },

  /**
   * Set the filter query server side
   * and refresh the list.
   */
  [SET_FILTERS_QUERY]({ commit }, query: string) {
    return axios.post('/qx/api/filters/query', { query })
      .then(() => commit(SET_FILTERS_QUERY, query))
      .catch(error => commit(PUSH_NOTIFICATION, {
        message: error,
      }));
  },
};

/**
 * MUTATIONS
 */

const mutations: VueXMutations = {
  [SET_FILTERS_QUERY](state: State, query: string) {
    state.query = query;
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
