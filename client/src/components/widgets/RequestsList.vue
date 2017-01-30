<template>
  <div>
    <RequestsListFilters />

    <List
      :values="formatRequests"
      :onClickOnRow="selectRequest"
    />

    <SideBar :visible="isSideBarVisible" :closeHandler="closeSideBar">
      <RequestDetails :requestUuid="selectedRequest" />
    </SideBar>
  </div>
</template>

<script>
/* globals EventSource: true */
/* globals window: true */

import get from 'lodash/get';

import List from '../ui/List';
import SideBar from '../ui/SideBar';

import RequestDetails from './RequestDetails';
import RequestsListFilters from './RequestsListFilters';
import error from '../../helpers/log';

import {
  GET_REQUESTS,
  SAVE_REQUESTS,
  SELECT_REQUEST,
  UNSELECT_REQUEST,

  GET_PROFILES,
} from '../../store/modules/requests';

const evtSource = new EventSource('/qx/sse');

export default {
  name: 'RequestsList',

  components: {
    List,
    SideBar,
    RequestDetails,
    RequestsListFilters,
  },

  data() {
    return {
      columns: [{
        label: '#',
      }, {
        label: 'Method',
      }, {
        label: 'Status',
      }, {
        label: 'URL',
      }, {
        label: 'Duration',
      }, {
        label: 'Length',
      }],
    };
  },

  created() {
    if (!this.$store.getters.profiles.length) {
      this.$store.dispatch(GET_PROFILES);
    }
  },

  /**
   * Bind handler when activating the component.
   * And load requests if the list is empty.
   */
  activated() {
    evtSource.addEventListener('request', this.pushRequest);

    if (!this.$store.getters.rawRequests.length) {
      this.$store.dispatch(GET_REQUESTS);
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
    formatRequests() {
      const formattedRequests: Array<RequestRow> = this.$store.getters.formattedRequests;

      const rows = formattedRequests.reverse().map((request) => {
        const color = get(request, 'profile.color', 'white');

        return {
          ...request,

          style: {
            'border-left': `5px solid ${color}`,
          },
        };
      });

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
        this.$store.commit(SAVE_REQUESTS, [requestData]);
      } catch (err) {
        error(String(err));
      }
    },

    /**
     * Save a request values in the store to show infos in the sidebar.
     * + bind a close handler in the window object.
     */
    selectRequest(request) {
      this.$store.commit(SELECT_REQUEST, request.uuid);
      window.addEventListener('keyup', this.closeSideBar);
    },

    /**
     * If the escape key is pressed, "unselect" the request in the store
     * and remove the close handler on the window object.
     */
    closeSideBar(e) {
      if (e.key === 'Escape' || e.type === 'click') {
        this.$store.commit(UNSELECT_REQUEST);
        window.removeEventListener('keyup', this.closeSideBar);
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
