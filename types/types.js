/* eslint-disable */

// @flow

type ProfileDefinition = {
  name: string,
  color?: string,
  urlsFilter?: (url: Object) => boolean,
};

type QXConfig = {
  endpoint: string,
  development: boolean,
  liveBundlePath: string,
  profiles: Array<ProfileDefinition>,
};
