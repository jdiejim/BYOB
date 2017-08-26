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

describe('API Beta Routes', () => {
  before((done) => {
    db.migrate.latest()
      .then(() => done());
  });

  beforeEach((done) => {
    db.seed.run()
      .then(() => done());
  });

  describe('GET /api/v1/betas', () => {
    it('should return all betas', (done) => {
      chai.request(server)
        .get('/api/v1/betas')
        .set('Token', normalToken)
        .end((err, res) => {
          const result = res.body.find(e => e.industry === 'Advertising' && e.region === 'US');
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(9);
          result.should.have.property('num_firms');
          result.num_firms.should.equal(41);
          result.should.have.property('average_unlevered_beta');
          result.average_unlevered_beta.should.equal(0.910182);
          result.should.have.property('average_levered_beta');
          result.average_levered_beta.should.equal(1.363);
          result.should.have.property('average_corr_market');
          result.average_corr_market.should.equal(0.183748);
          result.should.have.property('total_unlevered_beta');
          result.total_unlevered_beta.should.equal(4.95343);
          result.should.have.property('total_levered_beta');
          result.total_levered_beta.should.equal(7.41777);
          result.should.have.property('industry');
          result.industry.should.equal('Advertising');
          result.should.have.property('region');
          result.region.should.equal('US');
          done();
        });
    });

    it('should return sorted betas by ascending order when specified in query', (done) => {
      chai.request(server)
        .get('/api/v1/betas?sort=num_firms-asc')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(9);
          res.body[0].should.have.property('num_firms');
          res.body[0].num_firms.should.equal(35);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Finance');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('Japan');
          done();
        });
    });

    it('should return sorted betas by descending order when specified in query', (done) => {
      chai.request(server)
        .get('/api/v1/betas?sort=num_firms-desc')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(9);
          res.body[0].should.have.property('num_firms');
          res.body[0].num_firms.should.equal(170);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Engineering/Software');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('Europe');
          done();
        });
    });

    it('should return bad request if sort query is invalid', (done) => {
      chai.request(server)
        .get('/api/v1/betas?sort=nuuuum')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equal('Bad request');
          done();
        });
    });

    it('should return all betas of specific industry when queried', (done) => {
      chai.request(server)
        .get('/api/v1/betas?industry=Engineering/Software')
        .set('Token', normalToken)
        .end((err, res) => {
          const result = res.body.find(e => e.region === 'US');
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          result.should.have.property('num_firms');
          result.num_firms.should.equal(48);
          result.should.have.property('average_unlevered_beta');
          result.average_unlevered_beta.should.equal(1.00943);
          result.should.have.property('average_levered_beta');
          result.average_levered_beta.should.equal(1.18106);
          result.should.have.property('average_corr_market');
          result.average_corr_market.should.equal(0.361362);
          result.should.have.property('total_unlevered_beta');
          result.total_unlevered_beta.should.equal(2.7934);
          result.should.have.property('total_levered_beta');
          result.total_levered_beta.should.equal(3.26837);
          result.should.have.property('industry');
          result.industry.should.equal('Engineering/Software');
          result.should.have.property('region');
          result.region.should.equal('US');
          done();
        });
    });

    it('should return all betas of specific region when queried', (done) => {
      chai.request(server)
        .get('/api/v1/betas?region=Europe')
        .set('Token', normalToken)
        .end((err, res) => {
          const result = res.body.find(e => e.industry === 'Advertising');
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          result.should.have.property('num_firms');
          result.num_firms.should.equal(79);
          result.should.have.property('average_unlevered_beta');
          result.average_unlevered_beta.should.equal(0.664125);
          result.should.have.property('average_levered_beta');
          result.average_levered_beta.should.equal(0.810765);
          result.should.have.property('average_corr_market');
          result.average_corr_market.should.equal(0.193768);
          result.should.have.property('total_unlevered_beta');
          result.total_unlevered_beta.should.equal(3.42742);
          result.should.have.property('total_levered_beta');
          result.total_levered_beta.should.equal(4.18421);
          result.should.have.property('industry');
          result.industry.should.equal('Advertising');
          result.should.have.property('region');
          result.region.should.equal('Europe');
          done();
        });
    });

    it('should return beta of specific industry and region when queried', (done) => {
      chai.request(server)
        .get('/api/v1/betas?industry=Advertising&region=Europe')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('num_firms');
          res.body[0].num_firms.should.equal(79);
          res.body[0].should.have.property('average_unlevered_beta');
          res.body[0].average_unlevered_beta.should.equal(0.664125);
          res.body[0].should.have.property('average_levered_beta');
          res.body[0].average_levered_beta.should.equal(0.810765);
          res.body[0].should.have.property('average_corr_market');
          res.body[0].average_corr_market.should.equal(0.193768);
          res.body[0].should.have.property('total_unlevered_beta');
          res.body[0].total_unlevered_beta.should.equal(3.42742);
          res.body[0].should.have.property('total_levered_beta');
          res.body[0].total_levered_beta.should.equal(4.18421);
          res.body[0].should.have.property('industry');
          res.body[0].industry.should.equal('Advertising');
          res.body[0].should.have.property('region');
          res.body[0].region.should.equal('Europe');
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

  describe('GET /betas/:id', () => {
    it('should return beta matching the id param', (done) => {
      chai.request(server)
        .get('/api/v1/betas?industry=Advertising&region=US')
        .set('Token', normalToken)
        .end((error, response) => {
          const id = response.body[0].id;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('num_firms');
          response.body[0].num_firms.should.equal(41);
          response.body[0].should.have.property('average_unlevered_beta');
          response.body[0].average_unlevered_beta.should.equal(0.910182);
          response.body[0].should.have.property('average_levered_beta');
          response.body[0].average_levered_beta.should.equal(1.363);
          response.body[0].should.have.property('average_corr_market');
          response.body[0].average_corr_market.should.equal(0.183748);
          response.body[0].should.have.property('total_unlevered_beta');
          response.body[0].total_unlevered_beta.should.equal(4.95343);
          response.body[0].should.have.property('total_levered_beta');
          response.body[0].total_levered_beta.should.equal(7.41777);
          response.body[0].should.have.property('industry');
          response.body[0].industry.should.equal('Advertising');
          response.body[0].should.have.property('region');
          response.body[0].region.should.equal('US');
          chai.request(server)
            .get(`/api/v1/betas/${id}`)
            .set('Token', normalToken)
            .end((err, res) => {
              res.body.should.be.a('array');
              res.body.length.should.equal(1);
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
    });

    it('should return not found if id does not match', (done) => {
      chai.request(server)
        .get('/api/v1/betas/0')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Beta not found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/1')
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
        .get('/api/v1/betas?sort=num_firms-asc')
        .set('Token', normalToken)
        .end((error, response) => {
          const id = response.body[0].industry_id;
          chai.request(server)
            .get(`/api/v1/betas/industry/${id}`)
            .set('Token', normalToken)
            .end((err, res) => {
              const result = res.body.find(e => e.region === 'US');
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body.length.should.equal(3);
              result.should.have.property('num_firms');
              result.num_firms.should.equal(45);
              result.should.have.property('average_unlevered_beta');
              result.average_unlevered_beta.should.equal(0.421271);
              result.should.have.property('average_levered_beta');
              result.average_levered_beta.should.equal(1.07694);
              result.should.have.property('average_corr_market');
              result.average_corr_market.should.equal(0.362072);
              result.should.have.property('total_unlevered_beta');
              result.total_unlevered_beta.should.equal(1.1635);
              result.should.have.property('total_levered_beta');
              result.total_levered_beta.should.equal(2.97439);
              result.should.have.property('industry');
              result.industry.should.equal('Finance');
              result.should.have.property('region');
              result.region.should.equal('US');
              done();
            });
        });
    });

    it('should return not found if industry does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/0')
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

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/1')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });

  describe('GET /betas/region/:region_id', () => {
    it('should return all betas for a specified region', (done) => {
      chai.request(server)
        .get('/api/v1/betas?sort=num_firms-asc')
        .set('Token', normalToken)
        .end((error, response) => {
          const id = response.body[0].region_id;
          chai.request(server)
            .get(`/api/v1/betas/region/${id}`)
            .set('Token', normalToken)
            .end((err, res) => {
              const result = res.body.find(e => e.industry === 'Engineering/Software');
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body.length.should.equal(3);
              result.should.have.property('num_firms');
              result.num_firms.should.equal(166);
              result.should.have.property('average_unlevered_beta');
              result.average_unlevered_beta.should.equal(1.13172);
              result.should.have.property('average_levered_beta');
              result.average_levered_beta.should.equal(0.953741);
              result.should.have.property('average_corr_market');
              result.average_corr_market.should.equal(0.342529);
              result.should.have.property('total_unlevered_beta');
              result.total_unlevered_beta.should.equal(3.30402);
              result.should.have.property('total_levered_beta');
              result.total_levered_beta.should.equal(2.78441);
              result.should.have.property('industry');
              result.industry.should.equal('Engineering/Software');
              result.should.have.property('region');
              result.region.should.equal('Japan');
              done();
            });
        });
    });

    it('should return not found if region does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/betas/region/0')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Betas not found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/region/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/region/1')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });

  describe('GET /betas/industry/:industry_id/region/:region_id', () => {
    it('should return all betas for a specified industry and region', (done) => {
      chai.request(server)
        .get('/api/v1/betas?industry=Advertising&region=Europe')
        .set('Token', normalToken)
        .end((error, response) => {
          const industry_id = response.body[0].industry_id;
          const region_id = response.body[0].region_id;
          chai.request(server)
            .get(`/api/v1/betas/industry/${industry_id}/region/${region_id}`)
            .set('Token', normalToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body.length.should.equal(1);
              res.body[0].should.have.property('num_firms');
              res.body[0].num_firms.should.equal(79);
              res.body[0].should.have.property('average_unlevered_beta');
              res.body[0].average_unlevered_beta.should.equal(0.664125);
              res.body[0].should.have.property('average_levered_beta');
              res.body[0].average_levered_beta.should.equal(0.810765);
              res.body[0].should.have.property('average_corr_market');
              res.body[0].average_corr_market.should.equal(0.193768);
              res.body[0].should.have.property('total_unlevered_beta');
              res.body[0].total_unlevered_beta.should.equal(3.42742);
              res.body[0].should.have.property('total_levered_beta');
              res.body[0].total_levered_beta.should.equal(4.18421);
              res.body[0].should.have.property('industry');
              res.body[0].industry.should.equal('Advertising');
              res.body[0].should.have.property('region');
              res.body[0].region.should.equal('Europe');
              done();
            });
        });
    });

    it('should return not found if industry or region does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/0/region/0')
        .set('Token', normalToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Beta not found');
          done();
        });
    });

    it('should return error if no token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/1/region/1')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('You must be authorized to hit this endpoint');
          done();
        });
    });

    it('should return error if invalid token attached', (done) => {
      chai.request(server)
        .get('/api/v1/betas/industry/1/region/1')
        .set('Token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.error.should.equal('Invalid token');
          done();
        });
    });
  });

  // describe('Patch /betas/:id', () => {
  //   it('should update beta props', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/betas?industry=Advertising&region=US')
  //       .set('Token', adminToken)
  //       .end((e, r) => {
  //         const id = r.body[0].id;
  //         chai.request(server)
  //           .patch(`/api/v1/betas/${id}`)
  //           .set('Token', adminToken)
  //           .send({ num_firms: 1, region: 'Europe' })
  //           .end((err, res) => {
  //             console.log(res.body);
  //             res.should.have.status(200);
  //             res.body[0].num_firms.should.equal(1);
  //             res.body[0].region.should.equal('Europe');
  //             res.body[0].region_id.should.equal(2);
  //             done();
  //           });
  //       });
  //   });
  //
  //   it('should return not found if industry or region does not exist', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/betas/industry/0/region/0')
  //       .set('Token', normalToken)
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         res.body.error.should.equal('Beta not found');
  //         done();
  //       });
  //   });
  //
  //   it('should return error if no token attached', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/betas/industry/1/region/1')
  //       .end((err, res) => {
  //         res.should.have.status(403);
  //         res.body.error.should.equal('You must be authorized to hit this endpoint');
  //         done();
  //       });
  //   });
  //
  //   it('should return error if invalid token attached', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/betas/industry/1/region/1')
  //       .set('Token', invalidToken)
  //       .end((err, res) => {
  //         res.should.have.status(403);
  //         res.body.error.should.equal('Invalid token');
  //         done();
  //       });
  //   });
  // });
});
