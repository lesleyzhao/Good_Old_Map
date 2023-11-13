import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.mjs'

chai.use(chaiHttp)
const expect = chai.expect


// TODO:
// 1) test adding fav
// 2) test deleting fav
// 3) test fav display

let arts = [
    // Sample data structure
    { id: '1', city: 'NewYork', name: 'art1', author: '1XXXXXX', year: 4321, url: 'https://picsum.photos/200', inFavList: false },
    { id: '2', city: 'Paris', name: 'art2', author: '2XXXXXX', year: 1234, url: 'https://picsum.photos/200', inFavList: false },
    { id: '3', city: 'London', name: 'art3', author: '3XXXXXX', year: 2222, url: 'https://picsum.photos/200', inFavList: false },
];

describe('TestFavListFunctionalities', () => {

    //successfully save to fav list
    it('save to fav list', (done) => {
        chai.request(app)
            .post("/favlist/add")
            .send({ id: '1', inFavList: true })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id', '1');
                expect(res.body).to.have.property('inFavList', true);
                done(); // Now 'done' is defined and can be called
            });
    });

    //successfully remove from fav list
    it('remove from fav list', (done) => {
        chai.request(app)
            .post("/favlist/add")
            .send({ id: '1', inFavList: false })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('id', '1');
                expect(res.body).to.have.property('inFavList', false);
                done();
            })
    })

    // display fav art item
    it('display fav art item', (done) => {
        chai.request(app)
            .get("/getfavlist")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array');
                done();
            })
    })

    // display all art item
    it('display art item', (done) => {
        chai.request(app)
            .post('/getArts')
            .send({ location: 'NewYork', time: 4321 })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array');
                done();
            })

    })

    // _______________________________________edge testing____________________________________________________
    // not in item list

    it('not in item list', (done) => {
        chai.request(app)
            .post('/favlist/add')
            .send({ id: '5', inFavList: true })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.equal('Art not found');
                done();
            });
    });

    it('cannot remove from fav list', (done) => {
        chai.request(app)
            .post("/favlist/add")
            .send({ id: '1', inFavList: false })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('id', '1');
                expect(res.body).to.have.property('inFavList', true);
                done();
            })
    })

    it('invalid art ID', (done) => {
        chai.request(app)
            .post('/addFavList')
            .send({ id: 'NonExistentID' })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('invalid data format', (done) => {
        chai.request(app)
            .post('/getArts')
            .send({ location: 'dfvnfjkvnfdjnp', time: 'vbdfijvbdi' }) // Sending a number instead of a string for location
            .end((err, res) => {
                expect(res).to.have.status(400); // Assuming you handle this as a bad request
                done();
            });
    });

    it('missing art ID', (done) => {
        chai.request(app)
            .post('/addFavList')
            .send({}) // Sending empty data
            .end((err, res) => {
                expect(res).to.have.status(404); // Assuming you handle this as a bad request
                done();
            });
    });

    it('non-existent endpoint', (done) => {
        chai.request(app)
            .get('/nonexistentEndpoint')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    // it('location not found', () => {
    //     chai.request(app)
    //         .post('/getArts')
    //         .send({ location: 'Beijing', time: true })
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             // expect(res.test).to.equal('City not found');
    //             expect(res.body).to.have.property('location', 'Beijing');
    //             // expect(res.body).to.be.an('array');
    //             done();
    //         })

    // })

    // // time not found
    // it('Time not found', () => {
    //     chai.request(app)
    //         .post('/getArts')
    //         .send({ location: 'Paris', time: 3333 })
    //         .end((err, res) => {
    //             expect(res).to.have.status(404)
    //             expect(res.test).to.equal('Time not found');
    //             done();
    //         })

    // })

})
