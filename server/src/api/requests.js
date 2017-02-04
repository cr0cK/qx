// @flow

import express from 'express';

export default (db: DB) => {
  const router = express.Router();    // eslint-disable-line new-cap

  /**
   * Return the list of requests saved in the DB.
   */
  router.get('/', (req, res) => {
    const { query } = req.query;

    // eslint-disable-next-line no-unused-vars
    const filter = (request) => {
      try {
        const expression = `request.${query}`;
        return !!eval(expression);   // eslint-disable-line no-eval
      } catch (err) {
        console.log('Filter error', String(err));
        return true;
      }
    };

    res.json(
      db.get('requests')
        .filter(filter)
        // .take(50)   // 50 max for now
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
