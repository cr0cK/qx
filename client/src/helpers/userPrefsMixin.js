// @flow

import get from 'lodash/get';
import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

const cookieName = '.qx.userPrefs';

export default {
  methods: {
    /**
     * Save a stringified object into a cookie.
     */
    setUserPrefs: function (obj: Object) {
      this.$cookie.set(cookieName, JSON.stringify({
        ...this.$cookie.get(cookieName),
        ...obj,
      }));
    },

    /**
     * Retrieve a value from the cookie.
     */
    getUserPref: function (key: string, fallback?: string | number) {
      return get(JSON.parse(this.$cookie.get(cookieName)), key, fallback);
    },
  },
};
