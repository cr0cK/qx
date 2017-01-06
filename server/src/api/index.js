import express from 'express';

const router = express.Router();    // eslint-disable-line new-cap

export default (db: DB, config: Config) => {
  router.get('/', (req, res) => {
    res.send('Hello QX API!');
  });

  /**
   * Return the QX configuration.
   */
  router.get('/config', (req, res) => {
    res.json(config);
  });

  /**
   * Return the list of requests saved in the DB.
   */
  router.get('/requests', (req, res) => {
    res.json(
      db.get('requests')
        .take(50)   // 50 max for now
        .value(),
      );
  });

  /**
   * Delete all requests in DB.
   */
  router.delete('/requests', (req, res) => {
    db.set('requests', []).value();
    res.status(204).send();
  });

  /**
   * Return the details of a request.
   */
  router.get('/requests/:uuid', (req, res) => {
    res.json(
      db.get('requests')
        .find({ uuid: req.params.uuid })
        .value(),
      );
  });

  return router;
};
