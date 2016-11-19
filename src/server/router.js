// @flow

import path from 'path';
import express from 'express';

import bus from './bus';
import sseServer from './sse';
import client from './client';


/**
 * Hijack response writes to emit an event with the body of the response.
 */
const logResponseBody = (config: QXConfig) => (req, res, next) => {
  // intercept of not according to the filter function
  if (config.filter !== undefined && !config.filterUrls(req)) {
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
        requestDuration,
      });
    } catch (err) {
      // logging('Response chunks are not a buffer, skipping', req.originalUrl);
    }

    oldEnd.apply(res, arguments);   // eslint-disable-line prefer-rest-params
  };

  next();
};

/**
 * QX router.
 * Define routes to the different components.
 */
function qxRouter(options: QXConfig) {
  const router = express.Router();    // eslint-disable-line new-cap

  // save the start of the request
  router.use((req, res, next) => {
    req.qxStart = Date.now();         // eslint-disable-line no-param-reassign
    next();
  });

  // if development, proxy an endpoint to the live bundle provided by QX's
  // webpack-dev-server
  if (options.development) {
    const proxy = require('http-proxy-middleware');

    const endpoint = `${options.endpoint}/webpack`;

    router.use(endpoint, proxy({
      target: options.liveBundlePath,
      pathRewrite: { [endpoint]: '' },
    }));
  }

  // serve assets
  const assetsPath = path.join(__dirname, '..', '..', 'dist', 'client');
  router.use(`${options.endpoint}/assets`, express.static(assetsPath));

  // send SSE events of data received from the bus
  router.use(`${options.endpoint}/sse`, sseServer);

  // intercept the response to emit an event on the bus
  router.use(logResponseBody(options));

  // serve a client webapp plugged to the SSE server to view queries and responses
  router.use(options.endpoint, client(options));

  return router;
}

export default qxRouter;
