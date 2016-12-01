<template>
  <list :data="getRequests" />
</template>

<script>
/* globals EventSource: true */

import List from '../ui/List';

export default {
  name: 'RequestsList',

  rows: [],

  components: {
    List,
  },

  data() {
    return {
      requests: [],
    };
  },

  /**
   * Connect to the SSE server.
   */
  mounted() {
    const evtSource = new EventSource('/qx/sse');
    evtSource.addEventListener('request', this.pushRequest);
  },

  /**
   * Filters.
   */
  filters: {
    truncate(value, nbChars = 30) {
      if (!value) {
        return '';
      }
      return `${value.toString().slice(0, nbChars)}...`;
    },
  },

  computed: {
    getRequests() {
      const rows = this.requests.reduce((acc, request) => {
        acc.push([
          request.request.method,
          request.request.originalUrl,
        ]);
        return acc;
      }, this.rows);

      this.rows = [];

      return {
        columns: [{
          label: 'Method',
        }, {
          label: 'URL',
        }],
        rows,
      };
    },
  },

  methods: {
    /**
     * Push an event in the request lists.
     */
    pushRequest(event) {
      try {
        const data: RequestDataEvent = JSON.parse(event.data);
        this.requests.push(data);
      } catch (err) {
        // console.error(String(err), err.stack);
        this.errors.push(String(err));
      }
    },
  },
};
</script>

<style lang="less" scoped>

</style>
