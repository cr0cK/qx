// @flow

import type {
  $Request,
  $Response,
} from 'express';

import template from './template';

/**
 * Serve the webapp.
 */
const clientMiddleware = (options: QXConfig) =>
(req: $Request, res: $Response) => {
  res.setHeader('Content-Type', 'text/html');
  return res.send(template(options)).end();
};

export default clientMiddleware;
