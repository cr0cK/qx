<template>
  <div :class="{ sideBar: true, visible }">
    <TitlePage>Details</TitlePage>
    <div class="toolbar">
      <SmallButton icon="thumb-tack" :onClickHandler="toggleSticky" />
      <SmallButton icon="close" :onClickHandler="closeHandler" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import TitlePage from '../Title/TitlePage';
import SmallButton from '../Button/SmallButton';
import { log } from '../../../helpers/log';

export default {
  name: 'SideBar',

  components: {
    TitlePage,
    SmallButton,
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    closeHandler: Function,
  },

  methods: {
    toggleSticky() {
      log('TODO');
    },
  },
};
</script>

<style lang="less" scoped>
.sideBar {
  transition: transform .4s cubic-bezier(0.88, 0.01, 0.17, 1);
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  padding: 1em;
  box-sizing: border-box;
  z-index: 100;
  width: 70%;
  height: 100%;
  transform: translate3d(110%, 0, 0);
  box-shadow: -2px 0px 20px 0px #999;
  overflow: auto;

  &.visible {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
}

.toolbar {
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>
