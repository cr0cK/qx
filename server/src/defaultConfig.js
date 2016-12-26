// @flow

import path from 'path';

const defaultConfig: Config = {
  // if true, proxy the client path to liveBundlePath
  development: false,
  // path of the live bundle if development is true
  liveBundlePath: 'http://localhost:8080/app.js',
  // profiles definitions
  profiles: [],
  // QX db to store queries
  dbFilePath: path.join(process.cwd(), 'qx_db.json'),
};

export default defaultConfig;
