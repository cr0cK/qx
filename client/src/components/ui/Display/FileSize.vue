<template>
  <span>{{ format(value) }}</span>
</template>

<script>
const formatFileSize = (length) => {   // eslint-disable-line
  if (length === 0) {
    return 0;
  }
  const i = Math.floor(Math.log(length) / Math.log(1024));
  return ((length / Math.pow(1024, i)).toFixed(2) * 1) + ' ' +  // eslint-disable-line
    ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export default {
  name: 'FileSize',

  props: {
    value: [String, Number],
  },

  methods: {
    format: function () {
      return formatFileSize(this.value);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
