/* eslint no-param-reassign: 0 */

// @flow

import axios from 'axios';

import { formatFileSize } from '../../helpers/format';
import { error } from '../../helpers/log';


export const GET_SAVED_REQUESTS = 'requestsList/GET_SAVED_REQUESTS';
export const GET_REQUEST_DETAILS = 'requestsList/GET_REQUEST_DETAILS';
export const SAVE_REQUESTS = 'requestsList/SAVE_REQUESTS';
export const SELECT_REQUEST = 'requestsList/SELECT_REQUEST';
export const UNSELECT_REQUEST = 'requestsList/UNSELECT_REQUEST';
export const DELETE_REQUESTS = 'requestsList/DELETE_REQUESTS';

export const GET_PROFILES = 'requestsList/GET_PROFILES';
export const TOGGLE_ENABLED_DEFAULT_PROFILE =
  'requestsList/TOGGLE_ENABLED_DEFAULT_PROFILE';


type State = {
  requests: Array<RequestDataEvent>,
  selectedRequest?: string,
  requestDetails?: Object,
  profiles: Array<ProfileDefinition>,
};

const initialState: State = {
  requests: [],
  selectedRequest: undefined,
  requestDetails: undefined,
  profiles: [],
};

const getters = {
  getProfiles: (state: State) => state.profiles,

  rawRequests: (state: State): Array<RequestDataEvent> => state.requests,

  formattedRequests: (state: State): Array<RequestRow> => {   // eslint-disable-line no-shadow
    const enabledProfiles = state.profiles
      .filter(profile => profile.enabled)
      .map(profile => profile.name);

    return state.requests.reduce((acc, request, i) => {
      const latestProfile = request.profiles[request.profiles.length - 1];

      // do not add request if its last profile is disabled
      if (enabledProfiles.indexOf(latestProfile.name) === -1) {
        return acc;
      }

      acc.push({
        uuid: request.uuid,
        date: request.date,
        values: [
          i,
          request.request.method,
          request.response.statusCode,
          request.request.originalUrl,
          `${request.request.duration} ms`,
          formatFileSize(request.response.length),
        ],
        profiles: request.profiles,
        latestProfile: request.profiles[request.profiles.length - 1],
      });
      return acc;
    }, []);
  },

  selectedRequest: (state: State) => state.selectedRequest,

  requestDetails: (state: State) => state.requestDetails,
};

const actions: VueXActions = {
  /**
   * Retrieve the profiles from the config and set them in the store.
   */
  [GET_PROFILES]({ commit }) {
    axios.get('/qx/api/config')
      .then(response => commit('SET_PROFILES', response.data.profiles))
      .catch(error);
  },

  /**
   * Retrieve all requests and set them in the store.
   */
  [GET_SAVED_REQUESTS]({ commit }) {
    axios.get('/qx/api/requests')
      .then(response => commit(SAVE_REQUESTS, response.data))
      .catch(error);
  },

  /**
   * Delete all requests and clean the the store.
   */
  [DELETE_REQUESTS]({ commit }) {
    axios.delete('/qx/api/requests')
      .then(() => commit(DELETE_REQUESTS))
      .catch(error);
  },

  /**
   * Get the details of a request.
   */
  [GET_REQUEST_DETAILS]({ commit }, requestUuid) {
    axios.get(`/qx/api/requests/${requestUuid}`)
      .then(response => commit('SET_REQUEST_DETAILS', response.data))
      .catch(error);
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
    uuid: string,
  ) {
    state.selectedRequest = uuid;
  },

  [UNSELECT_REQUEST](state: State) {
    state.selectedRequest = undefined;
  },

  [DELETE_REQUESTS](state: State) {
    state.requests = [];
  },

  SET_REQUEST_DETAILS(state: State, requestDetails) {
    state.requestDetails = requestDetails;
  },

  /** Profiles **/

  SET_PROFILES(state: State, profiles: Array<ProfileDefinition>) {
    state.profiles = profiles.map(profile => ({
      ...profile,
      enabled: true,
    }));
  },

  [TOGGLE_ENABLED_DEFAULT_PROFILE](state: State) {
    state.profiles.map((profile) => {
      if (profile.name === 'default') {
        profile.enabled = !profile.enabled;
      }
      return profile;
    });
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
