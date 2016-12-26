// @flow

export const SAVE_REQUEST = 'explorer/SAVE_REQUEST';
// export const UNCREMENT = 'explorer/UNCREMENT';

type State = {
  requests: Array<RequestDataEvent>,
};

const initialState: State = {
  requests: [],
};

const getters = {
  allRequests: (state: State) => state.requests,
};

const actions = {
};

const mutations = {
  [SAVE_REQUEST](
    state: State,
    requestData: RequestDataEvent,
  ) {
    state.requests = [    // eslint-disable-line
      ...state.requests,
      requestData,
    ];
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
