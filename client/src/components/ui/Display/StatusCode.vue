<template>
  <span :style="getColor(value)">{{ value }}</span>
</template>

<script>
const colors = {
  2: '#009048',   // 2xx
  3: '#3254FF',   // 3xx
  4: '#D4A30B',   // 4xx
  5: '#FF0000',   // 5xx
};

export default {
  name: 'FileSize',

  props: {
    value: [Number, String],
  },

  methods: {
    getColor: function (value) {
      const color = colors[String(value)[0]] || '';
      if (!color) {
        return {};
      }
      return {
        color,
      };
    },
  },
};
</script>

<style lang="less" scoped>
span {
  font-weight: 600;
}
</style>
