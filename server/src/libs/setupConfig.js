import path from 'path';
import randomcolor from 'randomcolor';


const defaultConfig: Config = {
  // if true, proxy the client path to liveBundlePath
  development: false,
  // path of the live bundle if development is true
  liveBundlePath: 'http://localhost:8080/app.js',
  // profiles definitions
  profiles: [{
    name: 'default',
    color: 'white',
  }],
  // QX db to store queries
  dbFilePath: path.join(process.cwd(), 'qx_db.json'),
};

export default (config) => {
  const profiles = [
    ...defaultConfig.profiles,
    ...config.profiles,
  ];

  // define random colors for profiles
  profiles.forEach((profile) => {
    if (!profile.color) {
      profile.color = randomcolor({   // eslint-disable-line no-param-reassign
        luminosity: 'bright',
        hue: 'random',
      });
    }
  });

  return {
    ...defaultConfig,
    ...config,
    profiles,
  };
};
