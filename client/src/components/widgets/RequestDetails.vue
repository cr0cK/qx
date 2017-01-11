<template>
  <div>
    <div class="summary">
      <ul>
        <li>uuid: {{ getInfo('uuid') }}</li>
        <li>Date: {{ getInfo('date') }}</li>
        <li>Status Code: <StatusCode :value="getInfo('response.statusCode')"></StatusCode></li>
        <li>Length: <FileSize :value="getInfo('response.length')"></FileSize></li>
      </ul>
    </div>

    <div class="post-params">
      <h4>POST params</h4>
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
import { formatFileSize } from '../../helpers/format';

import {
  GET_REQUEST_DETAILS,
} from '../../store/modules/requestsList';

export default {
  name: 'RequestDetails',

  components: {
    FileSize,
    StatusCode,
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
pre {
  border: 1px solid silver;
  margin: 0;
  padding: 0.5em;
  box-sizing: border-box;
}
</style>
