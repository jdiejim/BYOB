const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const configuration = require('../knexfile').test;
const db = require('knex')(configuration);

const adminToken = jwt.sign({ admin: true }, process.env.SECRET_KEY);
const normalToken = jwt.sign({ admin: false }, process.env.SECRET_KEY);
const invalidToken = 'sad token';

chai.should();
chai.use(chaiHttp);

describe('API Region Routes', () => {
  before((done) => {
    db.migrate.latest()
      .then(() => done());
  });

  beforeEach((done) => {
    db.seed.run()
      .then(() => done());
  });

  describe('GET /api/v1/region', () => {
    it('should return all region names', (done) => {
      chai.request(server)
        .get('/api/v1/region')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          res.body[0].region.should.equal('US');
          res.body[1].region.should.equal('Europe');
          res.body[2].region.should.equal('Japan');
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
        .send({ name: 'China' })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('China');
          res.body.length.should.equal(1);
          chai.request(server)
            .get('/api/v1/region')
            .set('Token', adminToken)
            .end((error, response) => {
              response.should.have.status(200);
              response.body.length.should.equal(4);
              response.body[3].should.have.property('region');
              response.body[3].region.should.equal('China');
              done();
            });
        });
    });

    it('should not create new region if missing parameter', (done) => {
      chai.request(server)
        .post('/api/v1/region')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing region parameter');
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
    it('should update the name of a region', (done) => {
      chai.request(server)
        .get('/api/v1/region/')
        .set('Token', adminToken)
        .end((err, res) => {
          const id = res.body[0].id;
          res.should.have.status(200);
          res.body[0].region.should.equal('US');
          chai.request(server)
            .put(`/api/v1/region/${id}`)
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

    it('should not update the name of region if missing parameter', (done) => {
      chai.request(server)
        .put('/api/v1/region/1')
        .set('Token', adminToken)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equal('Missing region parameter');
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
          res.body.error.should.equal('Region not Found');
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
    it('should delete a region', (done) => {
      chai.request(server)
        .get('/api/v1/region/')
        .set('Token', adminToken)
        .end((err, res) => {
          const id = res.body[0].id;
          res.should.have.status(200);
          res.body.length.should.equal(3);
          res.body[0].region.should.equal('US');
          chai.request(server)
            .delete(`/api/v1/region/${id}`)
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
                  r.body.length.should.equal(2);
                  r.body[0].region.should.not.equal('US');
                  done();
                });
            });
        });
    });

    it('should return not found if region does not exists', (done) => {
      chai.request(server)
        .delete('/api/v1/region/0')
        .set('Token', adminToken)
        .send({ name: 'South America' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Region not Found');
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

    it('should return error if non-admin token attached', (done) => {
      chai.request(server)
        .delete('/api/v1/region/1')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be an admin to hit this endpoint');
          done();
        });
    });
  });
});
