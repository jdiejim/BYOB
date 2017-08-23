/* eslint-env mocha */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(configuration);
const industry = require('../data/json/industry');

// eslint-disable-next-line
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach((done) => {
    db.migrate.rollback()
      .then(() => db.migrate.rollback())
      .then(() => db.migrate.rollback())
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .then(() => done());
  });

  describe('GET /api/v1/industry', () => {
    it('should return all industry names', (done) => {
      chai.request(server)
        .get('/api/v1/industry')
        .end((err, res) => {
          res.should.have.status(200);
          // eslint-disable-next-line
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(96);
          res.body.map(e => e.name).should.deep.equal(industry);
          done();
        });
    });
  });

  describe('POST /api/v1/industry', () => {
    it('should create new industry', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(201);
          // eslint-disable-next-line
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('Sports');
          res.body.length.should.equal(1);
          chai.request(server)
            .get('/api/v1/industry')
            .end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(97);
              response.body[96].should.have.property('name');
              response.body[96].name.should.equal('Sports');
              done();
            });
        });
    });
  });

  describe('PUT /api/v1/industry/:id', () => {
    it('should update the name of an industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].name.should.equal('Advertising');
          chai.request(server)
            .put('/api/v1/industry/1')
            .send({ name: 'Sports' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('name');
              response.body[0].name.should.equal('Sports');
              chai.request(server)
                .get('/api/v1/industry/')
                .end((e, r) => {
                  r.should.have.status(200);
                  r.body[0].name.should.equal('Sports');
                  done();
                });
            });
        });
    });
  });

  describe('DELETE /api/v1/industry/:id', () => {
    it('should delete a specific industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].name.should.equal('Advertising');
          chai.request(server)
            .delete('/api/v1/industry/1')
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('name');
              response.body[0].name.should.equal('Advertising');
              chai.request(server)
                .get('/api/v1/industry/')
                .end((e, r) => {
                  r.should.have.status(200);
                  expect(r.body.find(el => el.name === 'Advertising')).to.equal(undefined);
                  done();
                });
            });
        });
    });
  });
});
