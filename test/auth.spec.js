const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const adminToken = jwt.sign({
  email: 'abc@byob.io',
  app: 'abc',
  admin: true,
}, process.env.SECRET_KEY, { expiresIn: '48h' });

const normalToken = jwt.sign({
  email: 'abc@gmail.com',
  app: 'abc',
  admin: false,
}, process.env.SECRET_KEY, { expiresIn: '48h' });

chai.should();
chai.use(chaiHttp);

describe('API Auth Routes', () => {
  describe('POST api/v1/auth/request_token', () => {
    it('should return token with admin property as false if email does not end in byob.io', (done) => {
      chai.request(server)
        .post('/api/v1/auth/request_token')
        .send({ email: 'abc@gmail.com', app: 'abc' })
        .end((err, res) => {
          const { email, app, admin } = jwt.verify(res.body.token, process.env.SECRET_KEY);
          res.should.have.status(201);
          res.body.should.have.property('token');
          email.should.equal('abc@gmail.com');
          app.should.equal('abc');
          admin.should.equal(false);
          done();
        });
    });

    it('should return token with admin property as true if email ends in byob.io', (done) => {
      chai.request(server)
        .post('/api/v1/auth/request_token')
        .send({ email: 'abc@byob.io', app: 'abc' })
        .end((err, res) => {
          const { email, app, admin } = jwt.verify(res.body.token, process.env.SECRET_KEY);
          res.should.have.status(201);
          res.body.should.have.property('token');
          email.should.equal('abc@byob.io');
          app.should.equal('abc');
          admin.should.equal(true);
          done();
        });
    });

    it('should return error if there are missing params', (done) => {
      chai.request(server)
        .post('/api/v1/auth/request_token')
        .send({ email: 'abc@gmail.com' })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('error');
          res.body.error.should.equal('Error missing: param: app ');
          done();
        });
    });
  });
});
