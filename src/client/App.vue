<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <ul class="errors"
      <li v-for="error in errors">
        {{ error }}
      </li>
    </ul>
    <ul>
      <li v-for="call in calls">
        {{ call.request.method }} - {{ call.request.originalUrl }} => {{ call.response.body | truncate }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      msg: 'Welcome to Your Vue.js App !!',
      calls: [],
      errors: [],
    };
  },
  mounted: function() {
    const evtSource = new EventSource('/qx/sse');
    evtSource.addEventListener('call', this.pushCall);
  },
  filters: {
    truncate: function (value, nbChars = 30) {
      if (!value) {
        return '';
      }
      return value.toString().slice(0, nbChars) + '...';
    }
  },
  methods: {
    pushCall: function(event) {
      try {
        const data = JSON.parse(event.data);
        this.calls.push(data);
      } catch (err) {
        console.error(String(err), err.stack);
        this.errors.push(String(err));
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

li {
  display: block;
}
</style>
