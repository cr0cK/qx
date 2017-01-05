<template>
  <div class="list">
    <template v-for="row in [values.columns]">
      <Row class="header" :row="row" />
    </template>

    <template v-for="row in formatRows(values.rows)">
      <Row class="body" :row="row" :onClickOnRow="callOnClickOnRow" />
    </template>
  </div>
</template>

<script>
import isObject from 'lodash/isObject';

import Row from './Row';

export default {
  name: 'List',

  components: {
    Row,
  },

  props: {
    values: Object,     // TODO define better the shape of values
    onClickOnRow: {
      type: Function,
      default() {},
    },
  },

  methods: {
    /**
     * From values.rows, create an object if it's not the case and retrieve
     * the styles (if defined) of the corresponding column.
     */
    formatRows(rows) {
      return rows.map((row, i) => {
        rows[i] = row.map((cell, j) => {   // eslint-disable-line no-param-reassign
          if (!isObject(cell)) {
            cell = {           // eslint-disable-line no-param-reassign
              label: cell,
            };
          }

          const column = this.values.columns[j];

          // reapply the style of the column
          if (column && 'style' in column) {
            cell.style = column.style;      // eslint-disable-line no-param-reassign
          }

          return cell;
        });

        return rows[i];
      });
    },

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

