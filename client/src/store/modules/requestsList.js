/* eslint no-param-reassign: 0 */

// @flow

import axios from 'axios';

export const GET_SAVED_REQUESTS = 'requestsList/GET_SAVED_REQUESTS';
export const SAVE_REQUESTS = 'requestsList/SAVE_REQUESTS';
export const SELECT_REQUEST = 'requestsList/SELECT_REQUEST';
export const UNSELECT_REQUEST = 'requestsList/UNSELECT_REQUEST';
export const CLEAR_LIST = 'requestsList/CLEAR_LIST';


type State = {
  requests: Array<RequestDataEvent>,
  selectedRequest?: RequestDataEvent,
};

const initialState: State = {
  requests: [],
  selectedRequest: undefined,
};

const getters = {
  allRequests: (state: State) => state.requests,
  selectedRequest: (state: State) => state.selectedRequest,
};

const actions: VueXActions = {
  [GET_SAVED_REQUESTS]({ commit }) {
    axios.get('/qx/api/requests')
      .then(response => commit(SAVE_REQUESTS, response.data))
      .catch((/* error */) => {
        // TODO
      });
  },

  [SAVE_REQUESTS]({ commit }, requestsData: Array<RequestDataEvent>) {
    commit(SAVE_REQUESTS, requestsData);
  },

  [SELECT_REQUEST]({ commit }, requestData: RequestDataEvent) {
    commit(SELECT_REQUEST, requestData);
  },

  [UNSELECT_REQUEST]({ commit }) {
    commit(UNSELECT_REQUEST);
  },

  [CLEAR_LIST]({ commit }) {
    commit(CLEAR_LIST);
  },
};

const mutations: VueXMutations = {
  [SAVE_REQUESTS](
    state: State,
    requestsData: Array<RequestDataEvent>,
  ) {
    state.requests = [
      ...state.requests,
      ...requestsData,
    ];
  },

  [SELECT_REQUEST](
    state: State,
    requestData: RequestDataEvent,
  ) {
    state.selectedRequest = requestData;
  },

  [UNSELECT_REQUEST](state: State) {
    state.selectedRequest = undefined;
  },

  [CLEAR_LIST](state: State) {
    state.requests = [];
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
