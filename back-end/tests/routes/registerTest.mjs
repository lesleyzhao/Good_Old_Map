import chai from 'chai';
import request from 'supertest';
import chaiHttp from 'chai-http';
import app from '../../src/app.mjs';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Registration Functionality', () => {
  // Write test cases using 'it'
  it('should register successfully', (done) => {
    chai.request(app)
      .post('/register')
      .send({ username: 'NewUser', email: 'newuser@example.com', password: 'newpassword' })
      .end((err, res) => {
        // Chai's 'expect' assertions
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'User successfully registered');
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('id');
        expect(res.body.user).to.have.property('username', 'NewUser');
        expect(res.body.user).to.have.property('email', 'newuser@example.com');
        done();
      });
  });

  it('should handle duplicate email', (done) => {
    chai.request(app)
      .post('/register')
      .send({ username: 'DuplicateUser', email: 'email@nyu.edu', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Email is already registered.');
        done();
      });
  });
});
