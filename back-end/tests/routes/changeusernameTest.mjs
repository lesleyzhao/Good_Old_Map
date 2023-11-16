import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.mjs'

chai.use(chaiHttp)
const expect = chai.expect

describe('Change Username Functionality', ()=>{
  const agent = chai.request.agent(app)
  //Write test cases using 'it'
  //Simulate a logged-in session to test
  before((done) => {
    agent
    .post('/login')
    .send({username: 'John Doe', password: 'password123'})
    .end((err,res) => {
        expect(res).to.have.status(200)
        done()
    }) 
  })
  it("should change username succesfully", (done) => {
    agent
    .patch("/changeusername")
    .send({newUsername: "jd"})
    .end((err,res) => {
        //Chai's 'expect' assertions
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message', 'Succesfully update username')
        done();
    })
  })

  //Simulate not-logged-in scenario
  const agent2 = chai.request.agent(app)
  before((done) => {
    agent2
    .post('/login')
    .send({username: 'J', password: 'password123'})
    .end((err,res) => {
        expect(res).to.have.status(404)
        done()
    }) 
  })
  it("should report 400 user-not-found", (done) => {
    agent2
    .patch("/changeusername")
    .send({newUsername: "jd"})
    .end((err,res) => {
        //Chai's 'expect' assertions
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('message', 'User not found.')
        done();
    })
  })

  //Simulated server error 500
  it("should report server error", (done) => {
    agent
    .patch("/changeusername")
    .send({newUsername: "triggerError"})
    .end((err,res) => {
        //Chai's 'expect' assertions
        expect(res).to.have.status(500)
        expect(res.body).to.have.property('message', 'Server error occurred')
        done();
    })
  })


  
  after(() => {
    agent.close()
    agent2.close()
  })

})