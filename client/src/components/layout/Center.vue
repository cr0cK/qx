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
  position: relative;
  padding: 1em;
  overflow-y: auto
}
</style>
