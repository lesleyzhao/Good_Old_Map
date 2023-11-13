import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app.mjs';
import { agent } from 'supertest';

chai.use(chaiHttp);
const expect = chai.expect;

let users = {
  "1234": { id: "1234", username: "John Doe", password: "password123", email: "email@nyu.edu" },
};

describe('resetpassword', () => {
  it('correct', (done) => {
    const userData = {
      userID: '1234',
      oldPassword: 'password123',
      newPassword: 'newpassword',
    };

    agent(app)
      .patch('/resetpassword')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Succesfully update password');
        expect(res.body.user).to.have.property('password', 'newpassword'); // Adjust based on your actual response structure
        done();
      });
  });

  it('password mismatch', (done) => {
    const userData = {
      userID: '1234',
      password: 'wrongpassword',
      email: 'email@nyu.edu',
    };

    agent(app)
      .patch('/resetpassword')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Wrong password.');
        done();
      });
  });

  it('user not found', (done) => {
    const userData = {
      userID: 'nonexistentuser',
      newpassword: 'password123',
      email: 'newemail@example.com',
    };

    agent(app)
      .patch('/resetpassword')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'User not found.');
        done();
      });
  });
});
