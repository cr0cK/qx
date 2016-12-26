<template>
  <div class="toolbar">
    <SmallButton icon="trash" :onClickHandler="clearList" />
  </div>
</template>

<script>
import {
  CLEAR_LIST,
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
      this.$store.dispatch(CLEAR_LIST);
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
