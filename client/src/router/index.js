import Vue from 'vue';
import Router from 'vue-router';

import Requests from '../views/Requests';
import Settings from '../views/Settings';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/qx', name: 'requests', component: Requests },
    { path: '/qx/settings', name: 'settings', component: Settings },
  ],
});
