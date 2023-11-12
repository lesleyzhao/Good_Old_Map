import chai from 'chai'
import request from 'supertest'
import chaiHttp from 'chai-http'
import app from '../../src/app.mjs'

chai.use(chaiHttp)
const expect = chai.expect

describe('Login Functionality', ()=>{
  //Write test cases using 'it'
  it("should login succesfully", (done) => {
    chai.request(app)
    .post("/login")
    .send({username: "John Doe", password: "password123"})
    .end((err,res) => {
        //Chai's 'expect' assertions
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message', 'Successfully logged in!')
        done();
    })
  })

  it("password mismatch", (done) =>{
    chai.request(app)
    .post("/login")
    .send({username: "John Doe", password: "pwd"})
    .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res.body).to.have.property('message', 'Incorrect Password.')
        done()
    })
  })

  it("user not found", (done) =>{
    chai.request(app)
    .post("/login")
    .send({username: "Doe", password: "password123"})
    .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res.body).to.have.property('message', 'User is not found.')
        done()
    })
  })

  it("user not found", (done) =>{
    chai.request(app)
    .post("/login")
    .send({username: "Doe", password: "pwd"})
    .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res.body).to.have.property('message', 'User is not found.')
        done()
    })
  })
})