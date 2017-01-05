<template>
  <div>
    <List
      :values="formatRequests"
      :onClickOnRow="selectRequest"
    />

    <SideBar :visible="isSideBarVisible" :closeHandler="closeSideBar">
      <RequestDetails
        :request="selectedRequest"
      />
    </SideBar>
  </div>
</template>

<script>
/* globals EventSource: true */
/* globals window: true */

import List from '../ui/List';
import SideBar from '../ui/SideBar';
import RequestDetails from './RequestDetails';
import error from '../../helpers/log';

import {
  GET_SAVED_REQUESTS,
  SAVE_REQUESTS,
  SELECT_REQUEST,
  UNSELECT_REQUEST,
} from '../../store/modules/requestsList';

const evtSource = new EventSource('/qx/sse');

export default {
  name: 'RequestsList',

  components: {
    List,
    SideBar,
    RequestDetails,
  },

  data() {
    return {
      columns: [{
        style: {
          width: '30px',
          // 'flex-grow': 0,
        },
        label: '#',
      }, {
        style: {
          width: '60px',
          // 'flex-grow': 0,
        },
        label: 'Method',
      }, {
        style: {
          width: '60px',
          // 'flex-grow': 0,
        },
        label: 'Status',
      }, {
        style: {
          // 'flex-grow': 1,
        },
        label: 'URL',
      }, {
        style: {
          width: '80px',
          // 'flex-grow': 0,
        },
        label: 'Duration',
      }, {
        style: {
          width: '80px',
          // 'flex-grow': 0,
        },
        label: 'Length',
      }],
    };
  },

  /**
   * Bind handler when activating the component.
   * And load requests if the list is empty.
   */
  activated() {
    evtSource.addEventListener('request', this.pushRequest);

    if (!this.$store.getters.allRequests.length) {
      this.$store.dispatch(GET_SAVED_REQUESTS);
    }
  },

  /**
   * Unbind when deactivating? Not sure if we want to continue to
   * intercept requests even if the Explorer is not loaded.
   */
  deactivated() {
    evtSource.removeEventListener('request', this.pushRequest);
  },

  filters: {
    /**
     * Truncate value.
     */
    truncate(value, nbChars = 30) {
      if (!value) {
        return '';
      }
      return `${value.toString().slice(0, nbChars)}...`;
    },
  },

  computed: {
    /**
     * Format requests from the store.
     */
    formatRequests() {
      const allRequests = this.$store.getters.allRequests;

      const rows = allRequests.reduce((acc, request, i) => {
        acc.push([
          i,
          request.request.method,
          request.response.statusCode,
          request.request.originalUrl,
          request.request.duration,
          request.response.length,
        ]);
        return acc;
      }, []);

      return {
        columns: this.columns,
        rows,
      };
    },

    selectedRequest() {
      return this.$store.getters.selectedRequest;
    },

    isSideBarVisible() {
      return !!this.selectedRequest;
    },
  },

  methods: {
    /**
     * Push an event in the request lists.
     */
    pushRequest(event) {
      try {
        const requestData: RequestDataEvent = JSON.parse(event.data);
        this.$store.dispatch(SAVE_REQUESTS, [requestData]);
      } catch (err) {
        error(String(err));
      }
    },

    /**
     * Save a request values in the store to show infos in the sidebar.
     * + bind a close handler in the window object.
     */
    selectRequest(request) {
      this.$store.dispatch(SELECT_REQUEST, request);
      window.addEventListener('keyup', this.closeSideBar);
    },

    /**
     * If the escape key is pressed, "unselect" the request in the store
     * and remove the close handler on the window object.
     */
    closeSideBar(e) {
      if (e.key === 'Escape' || e.type === 'click') {
        this.$store.dispatch(UNSELECT_REQUEST);
        window.removeEventListener('keyup', this.closeSideBar);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
