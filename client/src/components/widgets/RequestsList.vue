<template>
  <list :data="getRequests" />
</template>

<script>
/* globals EventSource: true */

import List from '../ui/List';
import { SAVE_REQUEST } from '../../store/modules/explorer';


export default {
  name: 'RequestsList',

  components: {
    List,
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
      const allRequests = this.$store.getters.allRequests;

      const rows = allRequests.reduce((acc, request) => {
        acc.push([
          request.request.method,
          request.request.originalUrl,
        ]);
        return acc;
      }, []);

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
        const requestData: RequestDataEvent = JSON.parse(event.data);
        this.$store.commit(SAVE_REQUEST, requestData);
      } catch (err) {
        // console.error(String(err), err.stack);
        this.errors.push(String(err));    // FIXME
      }
    },
  },
};
</script>

<style lang="less" scoped>

</style>
