const defaultConfig: QXConfig = {
  // if true, proxy the client path to liveBundlePath
  development: false,
  // path of the live bundle if development is true
  liveBundlePath: 'http://localhost:8080/app.js',
  // profiles definitions
  profiles: [],
};

export default defaultConfig;
