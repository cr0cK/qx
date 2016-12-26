<template>
  <div class="table-row" @click="onClickOnRow(row)">

    <template v-for="text4 in getStackedRow(row)">
      <div class="wrapper text-4">

        <template v-for="text2 in text4">
          <div class="wrapper text-2">

            <template v-for="text in text2">
              <div class="text">{{ showLabel(text) }}</div>
            </template>

          </div>
        </template>

      <div>
    </template>

  </div>
</template>

<script>
import isObject from 'lodash/isObject';
import error from '../../../helpers/log';

type Cell = {
  label: string,
};

type Row = Array<string>;

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
  name: 'ListRow',

  props: {
    row: Array,
    onClickOnRow: {
      type: Function,
      default() {},
    },
  },

  methods: {
    /**
     * Stack values for the nested loops for responsive table.
     */
    getStackedRow(row: Row) {
      return megaStackValues(row);
    },

    /**
     * Show the label of the cell.
     */
    showLabel(text: String | Cell) {
      try {
        return isObject(text) ?
          text.label :
          text;
      } catch (err) {
        error(err);
        return 'Err';
      }
    },
  },
};
</script>

<style lang="less" scoped>
/*
 * Define the widths: play around with these to get a best fit.
 */
@margin: 30px;
@text-width: 180px;
@num-width: 80px;

/*
 * Basic styles, good for a large display. Everything fits in
 * one row, no wrapping. All text based cells grow equally.
 */

// Main container: initialize the flex, direction is row, no wrapping. width 100%
.table-row {
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  width: 100%;
  font-size: 0.9em;
}

// Wrappers around cells and other wrappers: flex, row
.wrapper {
  display: flex;
  flex-direction: row;
  flex-grow: 0;
}

// Text cells and wrappers: grow equally when there is extra space
.text-4, .text-2, .text {
  flex-grow: 1;
}

// Text cells: truncate and show ellipsis when not enough space
.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 20px;
}

// Fix the minimum width of the leaf level cells
.text {
  width: @text-width;
}

.num {
  width: @num-width;
  text-align: right;
}

/*
 * Media queries: optimize for different screen widths.
 */

// convenience mixin for setting wrapper styles vertical
.vertical() {
  // Let the wrapper flex vertically, so we get 2 rows
  flex-direction: column;
  // can't have the children grow, since this means vertical growth
  div {
    flex-grow: 0;
    // but let them grow horizontally, 100% to fill the wrapper
    width: 100%;
  }
}

// First break: when one row does not fit, make it 2 rows
@media all and (max-width: (@margin*2 + @text-width*4 + @num-width*4)) {
  // inner wrappers vertical
  .text-2, .num-2 {
    .vertical();
  }
  // fix the widths of the inner level wrappers, else they take
  // children's natural size
  .text-2 { width: @text-width; }
  .num-2  { width: @num-width;  }
}

// Second break: when two rows is not enough, make it four
@media all and (max-width: (@margin*2 + @text-width*2 + @num-width*2)) {
  // Outer wrappers also vertical
  .text-4, .num-4 {
    .vertical();
  }
  // fix widths
  .text-4 { width: @text-width; }
  .num-4  { width: @num-width;  }
}

// Final: collapse all of them into one single column
@media all and (max-width: (@margin*2 + @text-width + @num-width)) {
  // wrap the main row container
  .table-row {
    .vertical();
  }
  // force the num cells to left-align to look better
  .num {
    text-align: left;
  }
}

/*
 * General good-look styles, not mandatory.
 */
.table-row {
  border-bottom: 1px solid #e0e0e0;
  border-collapse: collapse;
  padding: 6px 0px;

  &:hover {
    background: #efefef;
  }
}

.table-row.header {
  background-color: #f4f4f4;
  padding-top: 8px;
  padding-bottom: 8px;
}

/*
.text-2, .num-2 {
  border: 1px solid green;
  padding: 2px;
  margin: 2px;
}

.text-4, .num-4 {
  border: 1px solid red;
  margin: 2px;
}
*/
</style>
