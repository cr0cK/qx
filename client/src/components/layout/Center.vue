<template>
  <div class="center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Center',
};
</script>

<style lang="less">
.center {
  flex-grow: 1;
  padding: 1em 1.5em;
}
</style>
