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
const industry = require('../data/json/industry');

// eslint-disable-next-line
const should = chai.should();
const expect = chai.expect;
const tokenAdmin = jwt.sign({ admin: true }, process.env.SECRET_KEY);
const tokenNormal = jwt.sign({ admin: false }, process.env.SECRET_KEY);
const tokenWrong = 'sad token';

chai.use(chaiHttp);

describe('API Industry Routes', () => {
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
        .set('Token', tokenAdmin)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(96);
          res.body.map(e => e.industry).should.deep.equal(industry);
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
  });

  describe('POST /api/v1/industry', () => {
    it('should create new industry', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .set('Token', tokenAdmin)
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
            .set('Token', tokenAdmin)
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
        .set('Token', tokenAdmin)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });
  });

  describe('PUT /api/v1/industry/:id', () => {
    it('should update the name of industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .set('Token', tokenAdmin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].industry.should.equal('Advertising');
          chai.request(server)
            .put('/api/v1/industry/1')
            .set('Token', tokenAdmin)
            .send({ name: 'Sports' })
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('industry');
              response.body[0].industry.should.equal('Sports');
              chai.request(server)
                .get('/api/v1/industry/')
                .set('Token', tokenAdmin)
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
        .set('Token', tokenAdmin)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing name parameter');
          done();
        });
    });

    it('should return not found if industry does not exists', (done) => {
      chai.request(server)
        .put('/api/v1/industry/100')
        .set('Token', tokenAdmin)
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });
  });

  describe('DELETE /api/v1/industry/:id', () => {
    it('should delete industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .set('Token', tokenAdmin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].industry.should.equal('Advertising');
          chai.request(server)
            .delete('/api/v1/industry/1')
            .set('Token', tokenAdmin)
            .end((error, response) => {
              response.should.have.status(200);
              response.body[0].should.have.property('industry');
              response.body[0].industry.should.equal('Advertising');
              chai.request(server)
                .get('/api/v1/industry/')
                .set('Token', tokenAdmin)
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
        .set('Token', tokenAdmin)
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Not Found');
          done();
        });
    });
  });
});
