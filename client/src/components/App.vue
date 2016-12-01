<template>
  <div id="app">
    <Top />
    <Events />
  </div>
</template>

<script>
import Top from './Top';
import Events from './Events';

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
