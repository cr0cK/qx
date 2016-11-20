<template>
  <div id="app" v-md-theme="'default'">
    <Top></Top>
    <Events />
  </div>
</template>

<script>
import Top from './Top.vue';
import Events from './Events.vue';

export default {
  name: 'App',
  components: {
    Top,
    Events,
  },
};
</script>

<style>
  html,
  body {
    height: 100%;
    font-family: "Roboto-Regular", Helvetica, Arial, sans-serif;
    font-size: 1em;
  }
</style>
