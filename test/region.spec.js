/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.SECRET_KEY = 'hello';

const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')[process.env.NODE_ENV];
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
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(7);
          res.body.map(e => e.region).should.deep.equal(region);
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .get('/api/v1/region')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .get('/api/v1/region')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });

  describe('POST /api/v1/region', () => {
    it('should create new region', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .set('Token', adminToken)
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
            .set('Token', adminToken)
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
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });

    it('should return error if non-admin token attached', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be an admin to hit this endpoint');
          done();
        });
    });
  });

  describe('PUT /api/v1/region/:id', () => {
    it('should update the name of region', (done) => {
      chai.request(server)
        .get('/api/v1/region/')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].region.should.equal('US');
          chai.request(server)
            .put('/api/v1/region/1')
            .set('Token', adminToken)
            .send({ name: 'South America' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('region');
              response.body[0].region.should.equal('South America');
              chai.request(server)
                .get('/api/v1/region/')
                .set('Token', adminToken)
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
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });

    it('should return not found if region does not exists', (done) => {
      chai.request(server)
        .put('/api/v1/region/100')
        .set('Token', adminToken)
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .put('/api/v1/region/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .put('/api/v1/region/1')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });

    it('should return error if non-admin token attached', (done) => {
      chai.request(server)
        .put('/api/v1/region/1')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be an admin to hit this endpoint');
          done();
        });
    });
  });

  describe('DELETE /api/v1/region/:id', () => {
    it('should delete region', (done) => {
      chai.request(server)
        .get('/api/v1/region/')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].region.should.equal('US');
          chai.request(server)
            .delete('/api/v1/region/1')
            .set('Token', adminToken)
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('region');
              response.body[0].region.should.equal('US');
              chai.request(server)
                .get('/api/v1/region/')
                .set('Token', adminToken)
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
        .set('Token', adminToken)
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .delete('/api/v1/region/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .delete('/api/v1/region/1')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });
});
