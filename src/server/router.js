// @flow

import path from 'path';
import express from 'express';
import expressInterceptor from 'express-interceptor';

import bus from './bus';
import sseServer from './sse';
import clientMiddleware from './clientMiddleware';


/**
 * Intercept the response and emit an event on the bus with
 * the request and the intercepted body.
 */
const interceptor = (config: QXConfig) => expressInterceptor((req, res) => ({
  isInterceptable: () => true,              // capture all queries
  intercept: (body, send) => send(body),
  afterSend: (oldBody, newBody) => {
    bus.emit('call', {
      request: req,
      response: {
        // ...res,
        body: newBody,
      },
    });
  },
}));

/**
 * QX router.
 * Define routes to the different components.
 */
function qxRouter(options: QXConfig) {
  const router = express.Router();    // eslint-disable-line new-cap

  // serve the bundle client
  const clientBundlePath = path.join(__dirname, '../../dist/client');
  router.use(`${options.endpoint}/dist`, express.static(clientBundlePath));

  // send queries and responses listened from the bus via SSE events
  router.use(`${options.endpoint}/sse`, sseServer);

  // intercept the response to emit an event on the bus
  router.use(interceptor(options));

  // serve a client webapp plugged to the SSE server to view queries and responses
  router.use(options.endpoint, clientMiddleware(options));

  return router;
}

export default qxRouter;
