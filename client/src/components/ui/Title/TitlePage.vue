<template>
  <h3>
    <slot></slot>
  </h3>
</template>

<script>
export default {
  name: 'TitlePage',

  props: {
    title: String,
  },
};
</script>

<style lang="less" scoped>
h3 {
  margin-top: 0;
}
</style>
