<template>
  <h2>
    <slot></slot>
  </h2>
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
h2 {
  margin: 0 0 2em 0;
}
</style>
