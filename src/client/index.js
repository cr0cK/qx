import Vue from 'vue';
import VueMaterial from 'vue-material';

import App from './components/App.vue';
import store from './store';


Vue.use(VueMaterial);

Vue.material.theme.register('default', {
  primary: 'red',
  accent: 'pink',
});

new Vue({   // eslint-disable-line no-new
  store,
  el: '#app',
  render: h => h(App),
});
