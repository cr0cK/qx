// @flow

import router from './server/router';


const defaultOptions: QXConfig = {
  // QX endpoint in the app
  endpoint: '/qx',
  // if true, proxy the client path to liveBundlePath
  development: false,
  // path of the live bundle if development is true
  liveBundlePath: 'http://localhost:8080/client/bundle.js',
  // filter urls intercepted by QX
  filterUrls: () => true,
};

/**
 * Define a router for QX.
 */
const qxRouter = function qxRouter(options: Object = defaultOptions) {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  return router(finalOptions);
};

export default qxRouter;
