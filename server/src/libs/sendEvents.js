// @flow

import uuid from 'node-uuid';
import zlib from 'zlib';

import bus from './bus';
import log from './logger';


/**
 * Decode the response.
 *  - concat buffers
 *  - unzip if the content is zipped
 *  - decode to string
 *  - encode to JSON if the content-type is JSON
 */
const decodeResponse = (responseHeaders, chunks) => {
  const concatBuffers = localChunks => (
    new Promise((resolve, reject) => {
      try {
        const allBuffers = Buffer.concat(localChunks);
        resolve(allBuffers);
      } catch (err) {
        reject(err);
      }
    })
  );

  const unzip = (buffer) => {
    const isGzipEncoded = responseHeaders['content-encoding'] === 'gzip';

    if (!isGzipEncoded) {
      return Promise.resolve(buffer);
    }

    return new Promise((resolve, reject) => {
      zlib.unzip(buffer, (err, decodedBuffer) => {
        if (err) {
          reject(err);
        }
        resolve(decodedBuffer);
      });
    });
  };

  const decodeToString = buffer => (
    new Promise((resolve, reject) => {
      try {
        resolve(buffer.toString('utf8'));
      } catch (err) {
        reject(err);
      }
    })
  );

  const encodeToJSON = (string) => {
    const isJSON = /application\/json/.test(responseHeaders['content-type']);

    if (!isJSON) {
      return Promise.resolve(string);
    }

    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(string));
      } catch (err) {
        reject(err);
      }
    });
  };

  return concatBuffers(chunks)
    .then(unzip)
    .then(decodeToString)
    .then(encodeToJSON);
};

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

    const responseHeaders = res.header()._headers;   // eslint-disable-line no-underscore-dangle

    decodeResponse(responseHeaders, chunks)
      .then((responseBody) => {
        const requestData: RequestDataEvent = {
          uuid: uuid.v4(),
          date: String(new Date()),
          request: {
            headers: req.headers,
            method: req.method,
            originalUrl: req.originalUrl,
            duration: requestDuration,
          },
          response: {
            headers: responseHeaders,   // eslint-disable-line no-underscore-dangle
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
      })
      .catch((err) => {
        log.error('Cant decode the response body.', err);
      });
  };

  next();
};
