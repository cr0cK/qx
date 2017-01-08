<template>
  <div>
    <div class="header">
      <h4>Request headers</h4>
      <pre>{{ getRequestDetails('request.headers') }}</pre>
    </div>

    <div class="header">
      <h4>Response headers</h4>
      <pre>{{ getRequestDetails('response.headers') }}</pre>
    </div>

    <div class="body">
      <h4>Response body</h4>
      <pre>{{ getRequestDetails('response.body') }}</pre>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';

import {
  GET_REQUEST_DETAILS,
} from '../../store/modules/requestsList';

export default {
  name: 'RequestDetails',

  components: {
  },

  props: {
    requestUuid: String,
  },

  watch: {
    requestUuid: function (requestUuid) {
      this.$store.dispatch(
        GET_REQUEST_DETAILS,
        requestUuid
      );
    },
  },

  methods: {
    getRequestDetails(namespace) {
      return get(this.$store.getters.requestDetails, namespace, '');
    },
  },
};
</script>

<style lang="less">
pre {
  border: 1px solid silver;
  // font-size: 0.8em;
  margin: 0;
  padding: 0.5em;
  box-sizing: border-box;
}
</style>
