// @flow

import setupConfig from './libs/setupConfig';
import router from './libs/router';
import setupDB from './libs/db';


/**
 * Return QX router.
 */
const qxRouter = function qxRouter(config: Config) {
  const finalConfig = setupConfig(config);

  // setup DB
  const db = setupDB(finalConfig.dbFilePath);

  return router(db, finalConfig);
};

export default qxRouter;
