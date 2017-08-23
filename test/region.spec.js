/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(configuration);
const region = require('../data/json/regions');

// eslint-disable-next-line
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('API Region Routes', () => {
  beforeEach((done) => {
    db.migrate.rollback()
      .then(() => db.migrate.rollback())
      .then(() => db.migrate.rollback())
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .then(() => done());
  });

  describe('GET /api/v1/region', () => {
    it('should return all region names', (done) => {
      chai.request(server)
        .get('/api/v1/region')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(7);
          res.body.map(e => e.name).should.deep.equal(region);
          done();
        });
    });
  });

  describe('POST /api/v1/region', () => {
    it('should create new region', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('South America');
          res.body.length.should.equal(1);
          chai.request(server)
            .get('/api/v1/region')
            .end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(8);
              response.body[7].should.have.property('name');
              response.body[7].name.should.equal('South America');
              done();
            });
        });
    });

    it('should not create new region', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });
  });

  describe('PUT /api/v1/region/:id', () => {
    it('should update the name of region', (done) => {
      chai.request(server)
        .get('/api/v1/region/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].name.should.equal('US');
          chai.request(server)
            .put('/api/v1/region/1')
            .send({ name: 'South America' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('name');
              response.body[0].name.should.equal('South America');
              chai.request(server)
                .get('/api/v1/region/')
                .end((e, r) => {
                  r.should.have.status(200);
                  r.body[0].name.should.equal('South America');
                  done();
                });
            });
        });
    });

    it('should not update the name of region', (done) => {
      chai.request(server)
        .put('/api/v1/region/1')
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });

    it('should return not found if region does not exists', (done) => {
      chai.request(server)
        .put('/api/v1/region/100')
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });
  });

  describe('DELETE /api/v1/region/:id', () => {
    it('should delete region', (done) => {
      chai.request(server)
        .get('/api/v1/region/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].name.should.equal('US');
          chai.request(server)
            .delete('/api/v1/region/1')
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('name');
              response.body[0].name.should.equal('US');
              chai.request(server)
                .get('/api/v1/region/')
                .end((e, r) => {
                  r.should.have.status(200);
                  expect(r.body.find(el => el.name === 'US')).to.equal(undefined);
                  done();
                });
            });
        });
    });

    it('should return not found if region does not exists', (done) => {
      chai.request(server)
        .delete('/api/v1/region/100')
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });
  });
});
