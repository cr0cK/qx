<template>
  <span>{{ message }}</span>
</template>

<script>
export default {
  name: 'ErrorMessage',

  props: {
    message: String,
  },
};
</script>

<style lang="less" scoped>
span {
  color: red;
}
</style>
