<template>
  <div>
    <div>LOL</div>
    <div>
      <li v-for="call in calls">
        <span>{{ call.request.method }}</span>
        <span>{{ call.request.originalUrl }}</span>
        <span>{{ call.request.requestDuration }}</span>
        <span>{{ call.response.body | truncate }}</span>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App !!',
      calls: [],
      errors: [],
    };
  },
  mounted: function () {
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
li {
  display: block;
}
</style>
