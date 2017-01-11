/* eslint-disable */

// @flow

// Config

type ProfileDefinition = {
  name: string,
  color?: string,
  urlsFilter?: (url: Object) => boolean,
  enabled?: boolean,
};

type Config = {
  development: boolean,
  liveBundlePath: string,
  profiles: Array<ProfileDefinition>,
  interceptAllUrls: boolean,
  dbFilePath: string,
};

// Events

type RequestDataEvent = {
  uuid: string,
  date: string,
  request: {
    headers: Object,
    method: string,
    params: Object,
    queryParams: Object,
    originalUrl: string,
    duration: number,
  },
  response: {
    headers: Object,
    body: string,
    statusCode: string,
    length: number,
  },
  profiles: Array<ProfileDefinition>,
};

// UI

type RequestRow = {
  uuid: string,
  date: string,
  values: Array<string | number>,
  profiles: Array<ProfileDefinition>,
  latestProfile: ProfileDefinition,
  style?: Object,
}
