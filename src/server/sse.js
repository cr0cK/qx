// @flow

import type {
  $Request,
  $Response,
  // NextFunction,
} from 'express';

import isObject from 'lodash/isObject';

import bus from './bus';

const reqProperties = [
  'baseUrl',
  'body',
  'cookies',
  'fresh',
  'hostname',
  'ip',
  'ips',
  'method',
  'originalUrl',
  'params',
  'path',
  'protocol',
  'query',
  'route',
  'secure',
  'signedCookies',
  'stale',
  'subdomains',
  'xhr',
];

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
}

/**
 * Emit 'ticks' to keep the connexion alive.
 */
function startTick(res) {
  return setInterval(() => {
    writeRes(res, 'tick', null);
  }, 2000);
}

/**
 * Stop to emit 'ticks'.
 */
function stopTick(tickInterval) {
  if (tickInterval) {
    clearInterval(tickInterval);
  }
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

  const tickInterval = startTick(res);

  bus.on('call', ({ request, response }) => {
    // format request displayed data
    const reqData = reqProperties.reduce((acc, property) => {
      return {
        ...acc,
        [property]: request[property] || '',
      };
    }, {});

    // format response displayed data
    const resData = {
      body: response.body,
    };

    const data = {
      request: reqData,
      response: resData,
    };

    writeRes(res, 'call', data);
  });

  // stop tick interval when the request is closed
  req.on('close', () => stopTick(tickInterval));
}

export default sseServer;
