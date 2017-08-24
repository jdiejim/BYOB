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

// eslint-disable-next-line
const should = chai.should();
const expect = chai.expect;
const adminToken = jwt.sign({ admin: true }, process.env.SECRET_KEY);
const normalToken = jwt.sign({ admin: false }, process.env.SECRET_KEY);
const invalidToken = 'sad token';

chai.use(chaiHttp);

describe('API Beta Routes', () => {
  beforeEach((done) => {
    db.migrate.rollback()
      .then(() => db.migrate.rollback())
      .then(() => db.migrate.rollback())
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .then(() => done());
  });

  describe('GET /api/v1/betas', () => {
    it('should return all betas', (done) => {
      chai.request(server)
        .get('/api/v1/betas')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(672);
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(1);
          res.body[0].should.have.property('industry_id');
          res.body[0].industry_id.should.equal(1);
          res.body[0].should.have.property('num_firms');
          res.body[0].num_firms.should.equal(41);
          res.body[0].should.have.property('average_unlevered_beta');
          res.body[0].average_unlevered_beta.should.equal(0.910182);
          res.body[0].should.have.property('average_levered_beta');
          res.body[0].average_levered_beta.should.equal(1.363);
          res.body[0].should.have.property('average_corr_market');
          res.body[0].average_corr_market.should.equal(0.183748);
          res.body[0].should.have.property('total_unlevered_beta');
          res.body[0].total_unlevered_beta.should.equal(4.95343);
          res.body[0].should.have.property('total_levered_beta');
          res.body[0].total_levered_beta.should.equal(7.41777);
          res.body[0].should.have.property('region_id');
          res.body[0].region_id.should.equal(1);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Advertising');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('US');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .get('/api/v1/industry')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .get('/api/v1/industry')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });

  describe('POST /api/v1/industry', () => {
    it('should create new industry', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .set('Token', adminToken)
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Sports');
          res.body.length.should.equal(1);
          chai.request(server)
            .get('/api/v1/industry')
            .set('Token', adminToken)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(97);
              response.body[96].should.have.property('industry');
              response.body[96].industry.should.equal('Sports');
              done();
            });
        });
    });

    it('should not create new industry', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });

    it('should return error if non-admin token attached', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be an admin to hit this endpoint');
          done();
        });
    });
  });

  describe('PUT /api/v1/industry/:id', () => {
    it('should update the name of industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].industry.should.equal('Advertising');
          chai.request(server)
            .put('/api/v1/industry/1')
            .set('Token', adminToken)
            .send({ name: 'Sports' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('industry');
              response.body[0].industry.should.equal('Sports');
              chai.request(server)
                .get('/api/v1/industry/')
                .set('Token', adminToken)
                .end((e, r) => {
                  r.should.have.status(200);
                  r.body[0].industry.should.equal('Sports');
                  done();
                });
            });
        });
    });

    it('should not update the name of industry', (done) => {
      chai.request(server)
        .put('/api/v1/industry/1')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });

    it('should return not found if industry does not exists', (done) => {
      chai.request(server)
        .put('/api/v1/industry/100')
        .set('Token', adminToken)
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .put('/api/v1/industry/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .put('/api/v1/industry/1')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });

    it('should return error if non-admin token attached', (done) => {
      chai.request(server)
        .put('/api/v1/industry/1')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be an admin to hit this endpoint');
          done();
        });
    });
  });

  describe('DELETE /api/v1/industry/:id', () => {
    it('should delete industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].industry.should.equal('Advertising');
          chai.request(server)
            .delete('/api/v1/industry/1')
            .set('Token', adminToken)
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('industry');
              response.body[0].industry.should.equal('Advertising');
              chai.request(server)
                .get('/api/v1/industry/')
                .set('Token', adminToken)
                .end((e, r) => {
                  r.should.have.status(200);
                  expect(r.body.find(el => el.industry === 'Advertising')).to.equal(undefined);
                  done();
                });
            });
        });
    });

    it('should return not found if industry does not exists', (done) => {
      chai.request(server)
        .delete('/api/v1/industry/100')
        .set('Token', adminToken)
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .delete('/api/v1/industry/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .delete('/api/v1/industry/1')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });

    it('should return error if non-admin token attached', (done) => {
      chai.request(server)
        .delete('/api/v1/industry/1')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be an admin to hit this endpoint');
          done();
        });
    });
  });
});
