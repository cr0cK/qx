<template>
  <nav>
    <header>QX</header>

    <ul>
      <router-link tag="li" :to="{ name: 'requests' }">
        <i class="fa fa-list fa-2x"></i>
      </router-link>

      <router-link tag="li" :to="{ name: 'settings' }">
        <i class="fa fa-cog fa-2x"></i>
      </router-link>
    </ul>
  </nav>
</template>

<script>
// import Navigation from './Navigation';
// import RequestDetails from '../others//RequestDetails';

// <li title="Requests list"><i class="fa fa-list fa-2x"></i></li>
// <li title="Settings"><i class="fa fa-cog fa-2x"></i></li>

export default {
  name: 'Navigation',
  components: {
    // RequestDetails,
  },
};
</script>

<style lang="less" scoped>
nav {
  background: #342C3E;
  height: 100%;
  width: 75px;

  header {
    color: white;
    text-align: center;
    font-size: 1.8em;
    font-weight: 300;
    line-height: 1.4em;
    margin: 0.5em 0 1em 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    text-align: center;
    color: #d3c9e0;

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
