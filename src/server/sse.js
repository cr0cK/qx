// @flow

import type {
  $Request,
  $Response,
  // NextFunction,
} from 'express';

import isObject from 'lodash/isObject';

import bus from './bus';


let tickInterval;

// const reqProperties = [
//   'baseUrl',
//   'body',
//   'cookies',
//   'fresh',
//   'hostname',
//   'ip',
//   'ips',
//   'method',
//   'originalUrl',
//   'params',
//   'path',
//   'protocol',
//   'query',
//   'route',
//   'secure',
//   'signedCookies',
//   'stale',
//   'subdomains',
//   'xhr',
// ];

/**
 * Write SSE events to the response.
 */
function writeRes(res: $Response, event: string, data: Object | null) {
  let resData = '';
  if (isObject(data)) {
    resData = JSON.stringify(data);
  }

  res.write(`event: ${event}\n`);
  res.write(`data: ${resData}\n\n`);

  // fix ERR_INCOMPLETE_CHUNKED_ENCODING errors
  res.flush();
}

/**
 * Stop to emit 'ticks'.
 */
function stopTick() {
  if (tickInterval) {
    clearInterval(tickInterval);
  }
}

/**
 * Emit 'ticks' to keep the connexion alive.
 */
function startTick(res) {
  stopTick();

  tickInterval = setInterval(() => {
    writeRes(res, 'tick', null);
  }, 2000);
}

/**
 * SSE server used to send SSE events to the webapp
 * from events listened from the bus.
 */
function sseServer(req: $Request, res: $Response) {
  // $FlowFixMe
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  startTick(res);

  bus.on('call', ({ interceptReq, interceptResBody }) => {
    const data = {
      request: {
        method: interceptReq.method,
        originalUrl: interceptReq.originalUrl,
      },
      response: {
        body: interceptResBody,
      },
    };

    writeRes(res, 'call', data);
  });

  // stop tick interval when the request is closed
  req.on('close', () => stopTick(tickInterval));
}

export default sseServer;
