<template>
  <div class="toolbar">
    <SmallButton icon="filter" :onClickHandler="toggleDefaultProfiles" />
    <SmallButton icon="trash" :onClickHandler="clearList" />
  </div>
</template>

<script>
import {
  CLEAR_LIST,
  TOGGLE_ENABLED_DEFAULT_PROFILE,
} from '../../store/modules/requestsList';

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
    clearList() {
      this.$store.commit(CLEAR_LIST);
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
