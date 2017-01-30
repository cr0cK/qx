import low from 'lowdb';

export default (dbFilePath) => {
  const db: DB = low(dbFilePath);

  const defaults: DBDefaults = {
    requests: [],
    filters: {
      query: '',
    },
  };

  db.defaults(defaults)
    .value();

  return db;
};
