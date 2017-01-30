// @flow

import express from 'express';

export default (db: DB) => {
  const router = express.Router();    // eslint-disable-line new-cap

  /**
   * Return the list of requests saved in the DB.
   */
  router.get('/', (req, res) => {
    res.json(
      db.get('requests')
        .take(50)   // 50 max for now
        .value(),
      );
  });

  /**
   * Delete all requests in DB.
   */
  router.delete('/', (req, res) => {
    db.set('requests', []).value();
    res.status(204).send();
  });

  /**
   * Return the details of a request.
   */
  router.get('/:uuid', (req, res) => {
    res.json(
      db.get('requests')
        .find({ uuid: req.params.uuid })
        .value(),
      );
  });

  return router;
};
