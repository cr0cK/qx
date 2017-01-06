// @flow

import uuid from 'node-uuid';

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

  // if no profiles match, intercept all requests in the default profil
  if (!profiles.length) {
    profiles.push({ name: 'default' });
  }

  return profiles;
};

/**
 * Hijack response writes to emit an event with the body of the response.
 */
export default (db: DB, config: Config) => (req: Object, res: Object, next: Function): void => {
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

    let responseBody;
    try {
      const allBuffers = Buffer.concat(chunks);
      responseBody = allBuffers.toString('utf8');
    } catch (err) {
      // case of one chunck is not binary data
      try {
        responseBody = chunks.join('');
      } catch (err2) {
        log('Cant parse the response body chunks.');
        responseBody = '';
      }
    }

    const requestData: RequestDataEvent = {
      uuid: uuid.v4(),
      date: String(new Date()),
      request: {
        method: req.method,
        statusCode: req.statusCode,
        originalUrl: req.originalUrl,
        duration: requestDuration,
      },
      response: {
        body: responseBody,
        statusCode: res.statusCode,
        length: responseBody.length,
      },
      profiles,
    };

    // save request in the db
    db.get('requests')
      .push(requestData)
      .value();

    // emit the request via the bus
    bus.emit('request', requestData);

    oldEnd.apply(res, arguments);   // eslint-disable-line prefer-rest-params
  };

  next();
};
