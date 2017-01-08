<template>
  <main class="page">
    <Navigation />
    <Center>
      <router-view></router-view>
    </Center>
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
  font-family: "Omnes";
  src: url("/qx/static/fonts/Omnes.ttf");
}

@font-face {
  font-family: "DroidSansMono";
  src: url("/qx/static/fonts/DroidSansMono.ttf");
}

html,
body {
  font-family: "Omnes", sans-serif;
  font-weight: 300;
  font-size: 16px;
  height: 100%;
  overflow: hidden;
}

main.page {
  display: flex;
  height: 100%;
}

pre {
  font-family: "DroidSansMono", sans-serif;
  font-size: 12px;
  line-height: 1.3em;
}

li {
  line-height: 1.3em;
}

a {
  text-decoration: none;
  color: #FF9208;
}
</style>
