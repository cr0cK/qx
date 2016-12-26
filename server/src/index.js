// @flow

import defaultConfig from './defaultConfig';
import router from './libs/router';
import setupDB from './libs/db';

/**
 * Return QX router.
 */
const qxRouter = function qxRouter(config: Object = defaultConfig) {
  const finalConfig = {
    ...defaultConfig,
    ...config,
  };

  // setup DB
  const db = setupDB(finalConfig.dbFilePath);

  return router(db, finalConfig);
};

export default qxRouter;
