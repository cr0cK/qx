import bus from './bus';


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
const logResponseBody = (config: QXConfig) => (req, res, next): void => {
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

  res.end = function end_(chunk) {        // eslint-disable-line no-param-reassign
    if (chunk) {
      chunks.push(chunk);
    }

    // compute the duration of the request
    const requestDuration = (Date.now() - req.qxStart) / 1000;

    try {
      const responseBody = Buffer.concat(chunks).toString('utf8');

      bus.emit('call', {
        request: {
          method: req.method,
          originalUrl: req.originalUrl,
        },
        response: {
          body: responseBody,
        },
        profiles,
        requestDuration,
      });
    } catch (err) {
      // logging('Response chunks are not a buffer, skipping', req.originalUrl);
    }

    oldEnd.apply(res, arguments);   // eslint-disable-line prefer-rest-params
  };

  next();
};

export default logResponseBody;
