// @flow

import bus from './bus';
import log from './logger';


/**
 * Return the list of profiles that matches for the request object.
 */
export const selectProfiles =
(configProfiles: Array<ProfileDefinition>, req: Object): Array<ProfileDefinition> => {
  let profiles: Array<ProfileDefinition> = [];

  // found profiles matching the request
  profiles = configProfiles.reduce((acc, profil) => (
    profil.urlsFilter && profil.urlsFilter(req) ? [...acc, profil] : acc
  ), []);

  // if no profiles match, intercept all request in the default profil
  if (!profiles.length) {
    profiles.push({ name: 'default' });
  }

  return profiles;
};

/**
 * Hijack response writes to emit an event with the body of the response.
 */
export default (config: Config) => (req: Object, res: Object, next: Function): void => {
  const profiles = selectProfiles(config.profiles, req);

  // if no profiles found, don't intercept the request
  if (!profiles.length) {
    next();
    return;
  }

  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = function write_(chunk) {    // eslint-disable-line no-param-reassign
    chunks.push(chunk);
    oldWrite.apply(res, arguments);       // eslint-disable-line prefer-rest-params
  };

  /**
   * Restore the response from chunks and send events with data.
   * Events data will be sent via SSE.
   */
  res.end = function end_(chunk) {        // eslint-disable-line no-param-reassign
    if (chunk) {
      chunks.push(chunk);
    }

    // compute the duration of the request
    const requestDuration = (Date.now() - req.qxStart) / 1000;

    try {
      const responseBody = Buffer.concat(chunks).toString('utf8');

      const requestData: RequestDataEvent = {
        request: {
          method: req.method,
          originalUrl: req.originalUrl,
          duration: requestDuration,
        },
        response: {
          body: responseBody,
        },
        profiles,
      };

      bus.emit('request', requestData);
    } catch (err) {
      log('Response chunks are not a buffer, skipping', req.originalUrl);
    }

    oldEnd.apply(res, arguments);   // eslint-disable-line prefer-rest-params
  };

  next();
};