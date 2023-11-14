import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app.mjs';

chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request.agent(app)

let users = {
  "1234": { id: "1234", username: "John Doe", password: "password123", email: "email@nyu.edu" },
};

describe('resetemail', () => {
  it('correct', (done) => {
    const userData = {
      userID: '1234',
      password: 'password123',
      newEmail: 'newemail@example.com',
    };

    agent
      .patch('/resetemail')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Succesfully update email');
        expect(res.body.user).to.have.property('email', 'newemail@example.com'); // Adjust based on your actual response structure
        done();
      });
  });

  it('password mismatch', (done) => {
    const userData = {
      userID: '1234',
      password: 'wrongpassword',
      newEmail: 'newemail@example.com',
    };

    agent
      .patch('/resetemail')
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
      password: 'password123',
      newEmail: 'newemail@example.com',
    };

    agent
      .patch('/resetemail')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'User not found.');
        done();
      });
  });
});

