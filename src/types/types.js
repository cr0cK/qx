/* eslint-disable */

// @flow

type ProfileDefinition = {
  name: string,
  color: string,
  urlsPattern: (url: Object) => boolean,
};

type QXConfig = {
  endpoint: string,
  development: boolean,
  liveBundlePath: string,
  profiles: Array<ProfileDefinition>,
};
