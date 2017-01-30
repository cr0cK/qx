<template>
  <nav>
    <header>QX</header>

    <ul>
      <router-link tag="li" :to="{ name: 'requests' }">
        <i class="fa fa-exchange fa-2x"></i>
      </router-link>

      <router-link tag="li" :to="{ name: 'settings' }">
        <i class="fa fa-cog fa-2x"></i>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style lang="less" scoped>
nav {
  font-family: "Omnes", sans-serif;
  background: #222D32;
  width: 75px;

  header {
    color: white;
    text-align: center;
    font-size: 1.8em;
    font-weight: 600;
    line-height: 1em;
    margin: 0.5em 0 1em 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    text-align: center;
    color: white;
    color: #c1f8f5;

    li {
      list-style: none;
      margin: 0.75em 0;

      &:hover {
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
