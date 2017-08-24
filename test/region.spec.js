/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.SECRET_KEY = 'hello';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(configuration);
const region = require('../data/json/region');

// eslint-disable-next-line
const should = chai.should();
const expect = chai.expect;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGJ5b2IuaW8iLCJhcHAiOiJqZXQtZnVlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MDM2MDcxMDUsImV4cCI6MTUwMzc3OTkwNX0.n866puNGw4Y65cqJ28yZVU9aipAezo3Jc4_l3M6YVYY';
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
        .set('Token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(7);
          res.body.map(e => e.region).should.deep.equal(region);
          done();
        });
    });
  });

  describe('POST /api/v1/region', () => {
    it('should create new region', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .set('Token', token)
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('South America');
          res.body.length.should.equal(1);
          chai.request(server)
            .get('/api/v1/region')
            .set('Token', token)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(8);
              response.body[7].should.have.property('region');
              response.body[7].region.should.equal('South America');
              done();
            });
        });
    });

    it('should not create new region', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .set('Token', token)
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
        .set('Token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].region.should.equal('US');
          chai.request(server)
            .put('/api/v1/region/1')
            .set('Token', token)
            .send({ name: 'South America' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('region');
              response.body[0].region.should.equal('South America');
              chai.request(server)
                .get('/api/v1/region/')
                .set('Token', token)
                .end((e, r) => {
                  r.should.have.status(200);
                  r.body[0].region.should.equal('South America');
                  done();
                });
            });
        });
    });

    it('should not update the name of region', (done) => {
      chai.request(server)
        .put('/api/v1/region/1')
        .set('Token', token)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });

    it('should return not found if region does not exists', (done) => {
      chai.request(server)
        .put('/api/v1/region/100')
        .set('Token', token)
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
        .set('Token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].region.should.equal('US');
          chai.request(server)
            .delete('/api/v1/region/1')
            .set('Token', token)
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('region');
              response.body[0].region.should.equal('US');
              chai.request(server)
                .get('/api/v1/region/')
                .set('Token', token)
                .end((e, r) => {
                  r.should.have.status(200);
                  expect(r.body.find(el => el.region === 'US')).to.equal(undefined);
                  done();
                });
            });
        });
    });

    it('should return not found if region does not exists', (done) => {
      chai.request(server)
        .delete('/api/v1/region/100')
        .set('Token', token)
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });
  });
});
