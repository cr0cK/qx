<template>
  <button @click="onClickHandler" :title="title">
    <i :class="getClasses"></i>
  </button>
</template>

<script>
export default {
  name: 'SmallButton',

  props: {
    icon: String,
    title: String,
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
