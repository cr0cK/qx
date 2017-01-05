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

      <tr :style="row.style" v-for="row in values.rows">
        <td v-for="cell in row.values">
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
      this.onClickOnRow(row);
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

