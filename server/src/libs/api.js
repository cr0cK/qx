import express from 'express';

const router = express.Router();    // eslint-disable-line new-cap

export default (db: DB) => {
  router.get('/', (req, res) => {
    res.send('Hello QX API!');
  });

  router.get('/requests', (req, res) => {
    res.json(db.get('requests').value());
  });

  return router;
};
