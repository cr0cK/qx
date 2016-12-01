<template>
  <main class="page">
    <navigation />
    <center>
      <router-view></router-view>
    </center>
  </div>
</template>

<script>
import Navigation from './layout/Navigation';
import Center from './layout/Center';

export default {
  name: 'App',
  components: {
    Navigation,
    Center,
  },
};
</script>

<style lang="less">
@import "../../static/styles/normalize.less";
@import "../../static/font-awesome-4.7.0/less/font-awesome.less";

@font-face {
  font-family: "DroidSans";
  src: url("/qx/static/fonts/DroidSans.ttf");
}

html,
body {
  height: 100%;
  font-family: "DroidSans", sans-serif;
  font-size: 1em;
}

main.page {
  display: flex;
  height: 100%;
}
</style>
