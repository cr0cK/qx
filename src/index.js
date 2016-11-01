// @flow

import router from './server/router';


const defaultOptions = {
  endpoint: '/',
};

/**
 * Define a router for QX.
 */
const qxRouter = function qxRouter(options: QXConfig = defaultOptions) {
  const finalOptions = {
    ...defaultOptions,
    ...options,
  };

  return router(finalOptions);
};

export default qxRouter;
