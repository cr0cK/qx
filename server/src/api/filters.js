// @flow

import express from 'express';

export default (db: DB) => {
  const router = express.Router();    // eslint-disable-line new-cap

  router.get('/query', (req, res) => {
    const query = db.get('filters.query').value();
    res.json({ query });
  });

  router.post('/query', (req, res) => {
    db.set('filters.query', req.body.query).value();
    res.status(201).end();
  });

  return router;
};
