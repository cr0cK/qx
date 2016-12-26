/* eslint-disable */

// @flow

// Config

type ProfileDefinition = {
  name: string,
  color?: string,
  urlsFilter?: (url: Object) => boolean,
};

type Config = {
  development: boolean,
  liveBundlePath: string,
  profiles: Array<ProfileDefinition>,
};

// Events

type RequestDataEvent = {
  request: {
    method: string,
    originalUrl: string,
    duration: number,
  },
  response: {
    body: string,
  },
  profiles: Array<ProfileDefinition>,
};

