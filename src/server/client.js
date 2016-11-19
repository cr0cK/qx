// @flow

import template from './template';


/**
 * Serve the template for the client.
 */
const client = (options: QXConfig) => (req: Object, res: Object) => {
  res.setHeader('Content-Type', 'text/html');
  return res.send(template(options)).end();
};

export default client;
