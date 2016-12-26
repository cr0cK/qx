<template>
  <div>
    {{ request }}
  </div>
</template>

<script>
export default {
  name: 'RequestDetails',

  components: {
  },

  props: {
    request: Object,
  },
};
</script>

<style lang="less">

</style>
