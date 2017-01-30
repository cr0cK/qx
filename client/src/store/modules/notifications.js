// @flow

export const PUSH_NOTIFICATION = 'notifications/PUSH_NOTIFICATION';

type Notification = {
  message: string,
};

type State = {
  notifications: Array<Notification>,
};

const initialState: State = {
  notifications: [],
};

/**
 * GETTERS
 */

const getters = {
  // getProfiles: (state: State) => state.profiles,
};

/**
 * ACTIONS
 */

const actions: VueXActions = {
  /**
   * Retrieve the profiles from the config and set them in the store.
   */
  // [GET_PROFILES]({ commit }) {
  //   axios.get('/qx/api/config')
  //     .then(response => commit('SET_PROFILES', response.data.profiles))
  //     .catch(error);
  // },
};

/**
 * MUTATIONS
 */

const mutations: VueXMutations = {
  [PUSH_NOTIFICATION](
    state: State,
    notification: Notification,
  ) {
    state.notifications.push(notification);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
