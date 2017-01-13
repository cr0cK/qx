// @flow

import uuid from 'node-uuid';

import decodeResponse from './decodeResponse';
import bus from './bus';
import log from './logger';


/**
 * Return the list of profiles that matches for the request object.
 */
export const selectProfiles =
(config: Config, req: Object): Array<ProfileDefinition> => {
  const configProfiles: Array<ProfileDefinition> = config.profiles;
  const interceptAllUrls = !!config.interceptAllUrls;

  // found profiles matching the request
  const profiles = configProfiles.reduce((acc, profil) => (
    profil.urlsFilter && profil.urlsFilter(req) ? [...acc, profil] : acc
  ), []);

  // if interceptAllUrls and if no profiles match,
  // intercept all requests in the default profil
  if (interceptAllUrls && !profiles.length) {
    profiles.push({ name: 'default' });
  }

  return profiles;
};

/**
 * Hijack response writes to emit an event with the body of the response.
 */
export default (db: DB, config: Config) => (req: Object, res: Object, next: Function): void => {
  const profiles = selectProfiles(config, req);

  // if no profiles found, don't intercept the request
  if (!profiles.length) {
    next();
    return;
  }

  const originalWrite = res.write;
  const originalEnd = res.end;

  const chunks = [];

  res.write = function write_(chunk) {    // eslint-disable-line no-param-reassign
    chunks.push(chunk);
    originalWrite.apply(res, arguments);       // eslint-disable-line prefer-rest-params
  };

  /**
   * Restore the response from chunks and send events with data.
   * Events data will be sent via SSE.
   */
  res.end = function end_(chunk) {        // eslint-disable-line no-param-reassign
    // send now the response, decode and send the response after
    originalEnd.apply(res, arguments);   // eslint-disable-line prefer-rest-params

    if (chunk) {
      chunks.push(chunk);
    }

    // compute the duration of the request
    const requestDuration = (Date.now() - req.qxStart) / 1000;

    const responseHeaders = res.header()._headers;   // eslint-disable-line no-underscore-dangle

    const requestData: RequestDataEvent = {
      uuid: uuid.v4(),
      date: String(new Date()),
      request: {
        headers: req.headers,
        method: req.method,
        params: req.body,
        queryParams: req.query,
        originalUrl: req.originalUrl,
        duration: requestDuration,
      },
      response: {
        headers: responseHeaders,   // eslint-disable-line no-underscore-dangle
        body: '',
        statusCode: res.statusCode,
        length: 0,
      },
      profiles,
    };

    // save the request and emit it via the bus
    const processResponseData = (decodedResponse: DecodedResponse) => {
      requestData.response = {
        ...requestData.response,
        ...decodedResponse,
      };

      db.get('requests')
        .push(requestData)
        .value();

      bus.emit('request', requestData);
    };

    // once response is decoded, process it
    decodeResponse(responseHeaders, chunks)
      .then(decodedResponse => processResponseData(decodedResponse))
      .catch((err) => {
        log('Cant decode the response body.', err.stack);
        processResponseData({
          error: `Cant decode the response body: ${String(err)}`,
          body: 'N/A',
          length: 0,
        });
      });
  };

  next();
};
