// 'status=200 AND (method=POST OR method=GET)'

const lowdb = require('lowdb');


const state = {
  queries: [{
    status: 500,
    method: 'GET',
  }, {
    status: 200,
    method: 'GET',
  }, {
    status: 200,
    method: 'PATCH',
  }, {
    status: 200,
    method: 'POST',
  }, {
    status: 404,
    method: 'GET',
  }],
};

const db = lowdb();

db.setState(state);

const q = 'query.method === "PATCH" && query.status === 200';
// const q = 'blabla';


const evaluate = filterQuery => (query) => {    // eslint-disable-line no-unused-vars
  try {
    return !!eval(filterQuery);   // eslint-disable-line no-eval
  } catch (err) {
    // console.log('Filter error', String(err));
    return false;
  }
};

const filterQueries = (queryString) => {
  return db.get('queries')
    .filter(evaluate(queryString))
    .value();
};

console.log(filterQueries(q));
