<template>
  <div>
    <div class="summary">
      <h4>QX meta</h4>
      <ul>
        <li>UUID: {{ getInfo('uuid') }}</li>
        <li>Date: {{ getInfo('date') }}</li>
        <li>Profile: {{ getInfo('profile.name') }}</li>
        <li v-if="getInfo('response.error')">
          Error: <ErrorMessage :message="getInfo('response.error')" />
        </li>
      </ul>
    </div>

    <div class="post-params">
      <h4>Request summary</h4>
      <ul>
        <li>Status Code: <StatusCode :value="getInfo('response.statusCode')" /></li>
        <li>Method: {{ getInfo('request.method') }}</li>
        <li>Original url: {{ getInfo('request.originalUrl') }}</li>
        <li>Response length: <FileSize :value="getInfo('response.length')" /></li>
        <li>Request duration: {{ getInfo('request.duration') }} ms</li>
      </ul>
    </div>

    <div class="post-params">
      <h4>Body params</h4>
      <pre>{{ getInfo('request.params') }}</pre>
    </div>

    <div class="query-params">
      <h4>Query params</h4>
      <pre>{{ getInfo('request.queryParams') }}</pre>
    </div>

    <div class="header">
      <h4>Request headers</h4>
      <pre>{{ getInfo('request.headers') }}</pre>
    </div>

    <div class="header">
      <h4>Response headers</h4>
      <pre>{{ getInfo('response.headers') }}</pre>
    </div>

    <div class="body">
      <h4>Response body</h4>
      <pre>{{ getInfo('response.body') }}</pre>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';

import FileSize from '../ui/Display/FileSize';
import StatusCode from '../ui/Display/StatusCode';
import ErrorMessage from '../ui/Display/ErrorMessage';
import { formatFileSize } from '../../helpers/format';

import {
  GET_REQUEST_DETAILS,
} from '../../store/modules/requests';

export default {
  name: 'RequestDetails',

  components: {
    FileSize,
    StatusCode,
    ErrorMessage,
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

  computed: {
    request: function () {
      return this.$store.getters.requestDetails;
    },
  },

  methods: {
    getInfo(namespace) {
      return get(this.request, namespace, '');
    },

    formatLength(length) {
      return formatFileSize(length);
    },
  },
};
</script>

<style lang="less">
ul {
  margin: 0;
  padding: 0;

  li {
    margin-left: 1em;
  }
}

pre {
  border: 1px solid silver;
  margin: 0;
  padding: 0.5em;
  box-sizing: border-box;
}
</style>
