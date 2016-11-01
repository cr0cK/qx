// @flow

import path from 'path';
import express from 'express';

import bus from './bus';
import sseServer from './sse';
import clientMiddleware from './clientMiddleware';


/**
 * Hijack response writes to emit an event with the body of the response.
 */
const logResponseBody = (config: QXConfig) => (req, res, next) => {
  // intercept of not according to the filter function
  if (config.filter !== undefined && !config.filter(req)) {
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

    try {
      const responseBody = Buffer.concat(chunks).toString('utf8');
      bus.emit('call', {
        interceptReq: req,
        interceptResBody: responseBody,
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

  // serve the bundle client
  const clientBundlePath = path.join(
    process.cwd(), 'node_modules', '@crock', 'qx', 'dist', 'client');
  router.use(`${options.endpoint}/dist`, express.static(clientBundlePath));

  // send SSE events of data received from the bus
  router.use(`${options.endpoint}/sse`, sseServer);

  // intercept the response to emit an event on the bus
  router.use(logResponseBody(options));

  // serve a client webapp plugged to the SSE server to view queries and responses
  router.use(options.endpoint, clientMiddleware(options));

  return router;
}

export default qxRouter;
