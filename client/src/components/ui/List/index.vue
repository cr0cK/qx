<template>
  <div>
    <template v-for="row in formatedData.columns">
      <row class="header" :row="row" />
    </template>

    <template v-for="row in formatedData.rows">
      <row class="body" :row="row" />
    </template>

    <template v-for="row in formatedData.footers">
      <row class="footer" :row="row" />
    </template>
  </div>
</template>

<script>
import Row from './Row';

const stackValues = (values) => {
  let temp = [];
  return values.reduce((acc, value, i) => {
    temp.push(value);

    if (temp.length === 2 || i === values.length - 1) {
      acc.push(temp);
      temp = [];
    }

    return acc;
  }, []);
};

const megaStackValues = row => stackValues(stackValues(row));

export default {
  name: 'List',

  components: {
    Row,
  },

  props: {
    data: Object,
  },

  computed: {
    formatedData() {
      return {
        columns: Array.isArray(this.data.columns)
          && [this.data.columns].map(megaStackValues),
        rows: Array.isArray(this.data.rows)
          && this.data.rows.map(megaStackValues),
        footers: Array.isArray(this.data.footers)
          && [this.data.footers].map(megaStackValues),
      };
    },
  },
};
</script>

<style lang="less">

</style>

