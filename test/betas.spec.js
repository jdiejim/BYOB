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
// const expect = chai.expect;
// const adminToken = jwt.sign({ admin: true }, process.env.SECRET_KEY);
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

    it('should return all betas of specific industry when queried', (done) => {
      chai.request(server)
        .get('/api/v1/betas?industry=Entertainment')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(7);
          res.body[0].should.have.property('num_firms');
          res.body[0].num_firms.should.equal(79);
          res.body[0].should.have.property('average_unlevered_beta');
          res.body[0].average_unlevered_beta.should.equal(0.96579);
          res.body[0].should.have.property('average_levered_beta');
          res.body[0].average_levered_beta.should.equal(1.20236);
          res.body[0].should.have.property('average_corr_market');
          res.body[0].average_corr_market.should.equal(0.18793);
          res.body[0].should.have.property('total_unlevered_beta');
          res.body[0].total_unlevered_beta.should.equal(5.13908);
          res.body[0].should.have.property('total_levered_beta');
          res.body[0].total_levered_beta.should.equal(6.39789);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Entertainment');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('US');
          done();
        });
    });

    it('should return all betas of specific region when queried', (done) => {
      chai.request(server)
        .get('/api/v1/betas?region=Global')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(7);
          res.body[0].should.have.property('num_firms');
          res.body[0].num_firms.should.equal(434);
          res.body[0].should.have.property('average_unlevered_beta');
          res.body[0].average_unlevered_beta.should.equal(0.783823);
          res.body[0].should.have.property('average_levered_beta');
          res.body[0].average_levered_beta.should.equal(0.918855);
          res.body[0].should.have.property('average_corr_market');
          res.body[0].average_corr_market.should.equal(0.22843);
          res.body[0].should.have.property('total_unlevered_beta');
          res.body[0].total_unlevered_beta.should.equal(3.43135);
          res.body[0].should.have.property('total_levered_beta');
          res.body[0].total_levered_beta.should.equal(4.02249);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Building Materials');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('Global');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });
});
