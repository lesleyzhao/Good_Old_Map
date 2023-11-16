import chai, { expect } from "chai";
import app from "../../src/app.mjs";

describe("Delete Account Functionality",  function() {
  it ("should successfuly delete the account", function(done) {
    chai.request(app)
      .delete("/delaccount")
      .end((err, res) => {
        expect(res).to.be.status(200);
        done();
      })
  });
})