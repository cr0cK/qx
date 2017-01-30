<template>
  <div class="toolbar">
    <!-- <SmallButton icon="filter" title="Toggle default profiles" :onClickHandler="toggleDefaultProfiles" /> -->
    <SmallButton icon="trash" title="Delete all requests" :onClickHandler="deleteRequests" />
  </div>
</template>

<script>
import {
  DELETE_REQUESTS,
  TOGGLE_ENABLED_DEFAULT_PROFILE,
} from '../../store/modules/requests';

import SmallButton from '../ui/Button/SmallButton';

export default {
  name: 'RequestsListToolbar',

  components: {
    SmallButton,
  },

  methods: {
    /**
     * Clear the list.
     */
    deleteRequests() {
      this.$store.dispatch(DELETE_REQUESTS);
    },

    /**
     * TODO: Filter between profiles.
     * For now, just hide requests of "default" profile.
     */
    toggleDefaultProfiles() {
      this.$store.commit(TOGGLE_ENABLED_DEFAULT_PROFILE);
    },
  },
};
</script>

<style lang="less">
.toolbar {
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>
