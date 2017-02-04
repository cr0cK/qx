<template>
  <div class="filters">
    <h4>Filter query:</h4>
    <input
      type="text"
      :value="savedQuery"
      @keyup.enter="submitHandler"
      @blur="submitHandler"
      placeholder="request.statusCode === 200"
    />
  </div>
</template>

<script>
import userPrefsMixin from '../../helpers/userPrefsMixin';

import SmallButton from '../ui/Button/SmallButton';

import {
  GET_FILTERS_QUERY,
  SET_FILTERS_QUERY,
} from '../../store/modules/filters';

import {
  GET_REQUESTS,
} from '../../store/modules/requests';

export default {
  name: 'RequestsListFilters',

  mixins: [userPrefsMixin],

  components: {
    SmallButton,
  },

  created() {
    if (!this.$store.getters.filtersQuery) {
      this.$store.dispatch(GET_FILTERS_QUERY);
    }
  },

  computed: {
    savedQuery() {
      return this.$store.getters.filtersQuery;
    },
  },

  methods: {
    /**
     * Save the query and get queries.
     */
    submitHandler(evt) {
      this.setUserPrefs({ filtersQuery: evt.target.value });

      this.$store.dispatch(SET_FILTERS_QUERY, evt.target.value)
        .then(() => {
          this.$store.dispatch(GET_REQUESTS);
        });
    },
  },
};
</script>

<style lang="less">
.filters {
  margin: 1em 0;

  h4 {
    margin: 0 0 0.5em 0;
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
