import Vue from 'vue';

import App from './components/App';
import store from './store';

// Vue.use(VueMaterial);

new Vue({   // eslint-disable-line no-new
  store,
  el: '#app',
  render: h => h(App),
});
