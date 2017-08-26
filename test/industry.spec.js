const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(configuration);

const adminToken = jwt.sign({ admin: true }, process.env.SECRET_KEY);
const normalToken = jwt.sign({ admin: false }, process.env.SECRET_KEY);
const invalidToken = 'sad token';

chai.should();
chai.use(chaiHttp);

describe('API Industry Routes', () => {
  before((done) => {
    db.migrate.latest()
      .then(() => done());
  });

  beforeEach((done) => {
    db.seed.run()
      .then(() => done());
  });

  describe('GET /api/v1/industry', () => {
    it('should return all industry names', (done) => {
      chai.request(server)
        .get('/api/v1/industry')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Advertising');
          res.body[1].should.have.property('industry');
          res.body[1].industry.should.equal('Engineering/Software');
          res.body[2].should.have.property('industry');
          res.body[2].industry.should.equal('Finance');
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
          chai.request(server)
            .get('/api/v1/industry')
            .set('Token', adminToken)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(4);
              response.body[3].should.have.property('industry');
              response.body[3].industry.should.equal('Sports');
              done();
            });
        });
    });

    it('should not create new industry if missing parameter', (done) => {
      chai.request(server)
        .post('/api/v1/industry')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing industry parameter');
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
    it('should update the name of an industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .set('Token', adminToken)
        .end((err, res) => {
          const id = res.body[0].id;
          res.should.have.status(200);
          res.body[0].industry.should.equal('Advertising');
          chai.request(server)
            .put(`/api/v1/industry/${id}`)
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

    it('should not update the name of an industry if missing parameter', (done) => {
      chai.request(server)
        .put('/api/v1/industry/1')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing industry parameter');
          done();
        });
    });

    it('should return not found if industry does not exists', (done) => {
      chai.request(server)
        .put('/api/v1/industry/0')
        .set('Token', adminToken)
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Industry not Found');
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
    it('should delete an industry', (done) => {
      chai.request(server)
        .get('/api/v1/industry/')
        .set('Token', adminToken)
        .end((err, res) => {
          const id = res.body[0].id;
          res.should.have.status(200);
          res.body[0].industry.should.equal('Advertising');
          chai.request(server)
            .delete(`/api/v1/industry/${id}`)
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
                  r.body[0].industry.should.not.equal('Advertising');
                  done();
                });
            });
        });
    });

    it('should return not found if industry does not exists', (done) => {
      chai.request(server)
        .delete('/api/v1/industry/0')
        .set('Token', adminToken)
        .send({ name: 'Sports' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Industry not Found');
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
