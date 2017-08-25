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
          const result = res.body.find(e => e.id === 1);

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(7);
          result.should.have.property('num_firms');
          result.num_firms.should.equal(79);
          result.should.have.property('average_unlevered_beta');
          result.average_unlevered_beta.should.equal(0.96579);
          result.should.have.property('average_levered_beta');
          result.average_levered_beta.should.equal(1.20236);
          result.should.have.property('average_corr_market');
          result.average_corr_market.should.equal(0.18793);
          result.should.have.property('total_unlevered_beta');
          result.total_unlevered_beta.should.equal(5.13908);
          result.should.have.property('total_levered_beta');
          result.total_levered_beta.should.equal(6.39789);
          result.should.have.property('industry');
          result.industry.should.equal('Entertainment');
          result.should.have.property('region');
          result.region.should.equal('US');
          done();
        });
    });

    it('should return all betas of specific region when queried', (done) => {
      chai.request(server)
        .get('/api/v1/betas?region=Global')
        .set('Token', normalToken)
        .end((err, res) => {
          const result = res.body.find(e => e.industry_id === 30);

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(96);
          result.should.have.property('num_firms');
          result.num_firms.should.equal(1118);
          result.should.have.property('average_unlevered_beta');
          result.average_unlevered_beta.should.equal(0.844317);
          result.should.have.property('average_levered_beta');
          result.average_levered_beta.should.equal(1.09074);
          result.should.have.property('average_corr_market');
          result.average_corr_market.should.equal(0.234456);
          result.should.have.property('total_unlevered_beta');
          result.total_unlevered_beta.should.equal(3.60117);
          result.should.have.property('total_levered_beta');
          result.total_levered_beta.should.equal(4.65223);
          result.should.have.property('industry');
          result.industry.should.equal('Engineering/Construction');
          result.should.have.property('region');
          result.region.should.equal('Global');
          done();
        });
    });

    it('should return beta of specific industry and region when queried', (done) => {
      chai.request(server)
        .get('/api/v1/betas?industry=Engineering/Construction&region=US')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('num_firms');
          res.body[0].num_firms.should.equal(48);
          res.body[0].should.have.property('average_unlevered_beta');
          res.body[0].average_unlevered_beta.should.equal(1.00943);
          res.body[0].should.have.property('average_levered_beta');
          res.body[0].average_levered_beta.should.equal(1.18106);
          res.body[0].should.have.property('average_corr_market');
          res.body[0].average_corr_market.should.equal(0.361362);
          res.body[0].should.have.property('total_unlevered_beta');
          res.body[0].total_unlevered_beta.should.equal(2.7934);
          res.body[0].should.have.property('total_levered_beta');
          res.body[0].total_levered_beta.should.equal(3.26837);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Engineering/Construction');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('US');
          done();
        });
    });

    it('should return not found if query does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/betas?industry=Sports')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Betas not found');
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

  describe('GET /betas/industry/:industry_id', () => {
    it('should return all betas for a specified industry', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/1')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(7);
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
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Advertising');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('US');
          done();
        });
    });

    it('should return not found if query does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/100')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Betas not found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });
  });
});
