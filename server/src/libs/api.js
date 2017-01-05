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
    res.json(db.get('requests').value());
  });

  return router;
};
