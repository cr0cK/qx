import Vue from 'vue';
import VueMaterial from 'vue-material';

import Header from './components/header.vue';
import Events from './components/events.vue';
import App from './App.vue';


Vue.use(VueMaterial);

Vue.material.theme.register('default', {
  primary: 'red',
  accent: 'pink',
});

Vue.component('Header', Header);
Vue.component('Events', Events);

new Vue({   // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
});
