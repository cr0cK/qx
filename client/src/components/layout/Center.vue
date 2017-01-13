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
  padding: 20px;
  width: 100%;
  overflow-y: auto;
}
</style>
