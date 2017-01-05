<template>
  <div class="list">
    <table>
      <tr>
        <th v-for="column in values.columns">
          <div>
            {{ column.label }}
          </div>
        </th>
      </tr>

      <tr v-for="row in values.rows">
        <td v-for="cell in row">
          <div @click="callOnClickOnRow(row)">
            {{ cell }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'List',

  components: {
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
table {
  width: 100%;

  td {
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #f4f4f4;
  }

  tr {
    &:hover {
      background: #c1f8f5;
      cursor: pointer;
    }

    th, td {
      text-align: left;

      div {
        padding: 1em;
      }
    }
  }
}
</style>

