// @flow

import defaultConfig from './defaultConfig';
import router from './libs/router';

/**
 * Return QX router.
 */
const qxRouter = function qxRouter(config: Object = defaultConfig) {
  const finalConfig = {
    ...defaultConfig,
    ...config,
  };

  return router(finalConfig);
};

export default qxRouter;
