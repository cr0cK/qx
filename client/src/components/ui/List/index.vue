<template>
  <div class="list">
    <template v-for="row in [values.columns]">
      <Row class="header" :row="row" />
    </template>

    <template v-for="row in values.rows">
      <Row class="body" :row="row" :onClickOnRow="callOnClickOnRow" />
    </template>
  </div>
</template>

<script>
import Row from './Row';

export default {
  name: 'List',

  components: {
    Row,
  },

  props: {
    values: Object,
    onClickOnRow: {
      type: Function,
      default() {},
    },
  },

  methods: {
    /**
     * Call `onClickOnRow` handler with values and columns.
     */
    callOnClickOnRow(row) {
      const formattedValues = row.reduce((acc, value, i) => {
        const columnLabel = this.values.columns[i].label;
        return {
          ...acc,
          [columnLabel]: value,
        };
      }, {});

      this.onClickOnRow(formattedValues);
    },
  },
};
</script>

<style lang="less">
</style>

