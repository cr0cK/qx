// @flow

import express from 'express';

import configRouter from './config';
import filtersRouter from './filters';
import requestsRouter from './requests';


const router = express.Router();    // eslint-disable-line new-cap

export default (db: DB, config: Config) => {
  router.get('/', (req, res) => {
    res.send('Hello QX API!');
  });

  router.use('/config', configRouter(config));
  router.use('/filters', filtersRouter(db));
  router.use('/requests', requestsRouter(db));

  return router;
};
