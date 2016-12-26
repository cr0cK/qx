<template>
  <button @click="onClickHandler">
    <i :class="getClasses"></i>
  </button>
</template>

<script>
export default {
  name: 'SmallButton',

  props: {
    icon: String,
    onClickHandler: Function,
  },

  computed: {
    getClasses() {
      return {
        fa: true,
        [`fa-${this.icon}`]: true,
      };
    },
  },
};
</script>

<style lang="less" scoped>

</style>
