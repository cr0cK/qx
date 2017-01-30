// @flow

import express from 'express';

export default (config: Config) => {
  const router = express.Router();    // eslint-disable-line new-cap

  /**
   * Return the QX configuration.
   */
  router.get('/', (req, res) => {
    res.json(config);
  });

  return router;
};
