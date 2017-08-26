/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */

const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile').test;
const db = require('knex')(configuration);
const region = require('../data/json/region');

// eslint-disable-next-line
const should = chai.should();
const expect = chai.expect;
const adminToken = jwt.sign({ admin: true }, process.env.SECRET_KEY);
const normalToken = jwt.sign({ admin: false }, process.env.SECRET_KEY);
const invalidToken = 'sad token';
chai.use(chaiHttp);

describe('API Region Routes', () => {
  before(done => {
  db.migrate.rollback()
  .then(() => db.migrate.latest())
  .then(() => done())
  // db.migrate.latest().then(() => done())
});

beforeEach(done => {
  db.seed.run()
  .then(() => done())
});

  describe('GET /api/v1/region', () => {
    it('should return all region names', (done) => {
      // db.migrate.rollback()
      //   .then(() => db.migrate.rollback())
      //   .then(() => db.migrate.rollback())
      //   .then(() => db.migrate.latest())
      //   // .then(() => db.seed.run())
      //   .then(() => done())
      //   .then(() => console.log('cleared'));
    }).timeout(100000);
  });
});
