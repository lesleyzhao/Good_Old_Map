import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.mjs'

chai.use(chaiHttp)
const expect = chai.expect


// TODO:
// 1) test if we have city, artinfo, timeline
// 2) test if only city, artinfo
// 3) test if only city, timeline
// 4) test if only artinfo, timeline
// 5) test if only city
// 6) test if only artinfo
// 7) test if only timeline
// 8) test if none of the above

let arts = [
    // Sample data structure
    { id: '1', city: 'NewYork', name: 'art1', author: '1XXXXXX', year: 4321, url: 'https://picsum.photos/200', inFavList: false },
    { id: '2', city: 'Paris', name: 'art2', author: '2XXXXXX', year: 1234, url: 'https://picsum.photos/200', inFavList: false },
    { id: '3', city: 'London', name: 'art3', author: '3XXXXXX', year: 2222, url: 'https://picsum.photos/200', inFavList: false },
];

describe('SearchTest', () => {
    it('should return results when all parameters are provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ city: 'NewYork', artinfo: '1', timeline: [3000, 5000] });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'art1');
        expect(response.body[0]).to.have.property('author', '1XXXXXX');
        expect(response.body[0]).to.have.property('year', 4321);
    });
    it ('should return results when only city and artinfo are provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ city: 'Paris', artinfo: '2' });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'art2');
        expect(response.body[0]).to.have.property('author', '2XXXXXX');
        expect(response.body[0]).to.have.property('year', 1234);
    });
    it ('should return results when only city and timeline are provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ city: 'London', timeline: [2000, 3000]});

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'art3');
        expect(response.body[0]).to.have.property('author', '3XXXXXX');
        expect(response.body[0]).to.have.property('year', 2222);
    });
    it ('should return results when only artinfo and timeline are provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ artinfo: '3', timeline: [1000, 3000] });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'art3');
        expect(response.body[0]).to.have.property('author', '3XXXXXX');
        expect(response.body[0]).to.have.property('year', 2222);
    });
    it ('should return results when only city is provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ city: 'NewYork' });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'art1');
        expect(response.body[0]).to.have.property('author', '1XXXXXX');
        expect(response.body[0]).to.have.property('year', 4321);
    });
    it ('should return results when only artinfo is provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ artinfo: '2' });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'art2');
        expect(response.body[0]).to.have.property('author', '2XXXXXX');
        expect(response.body[0]).to.have.property('year', 1234);
    });
    it ('should return results when only timeline is provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ timeline: [2000, 3000] });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(1);
        expect(response.body[0]).to.have.property('name', 'art3');
        expect(response.body[0]).to.have.property('author', '3XXXXXX');
        expect(response.body[0]).to.have.property('year', 2222);
    });
    it ('should return results when none of the above are provided', async () => {
        const response = await chai.request(app)
            .get('/search');
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(3);
        expect(response.body[0]).to.have.property('name', 'art1');
        expect(response.body[0]).to.have.property('author', '1XXXXXX');
        expect(response.body[0]).to.have.property('year', 4321);
        expect(response.body[1]).to.have.property('name', 'art2');
        expect(response.body[1]).to.have.property('author', '2XXXXXX');
        expect(response.body[1]).to.have.property('year', 1234);
        expect(response.body[2]).to.have.property('name', 'art3');
        expect(response.body[2]).to.have.property('author', '3XXXXXX');
        expect(response.body[2]).to.have.property('year', 2222);
    });
    it ('should return results when city is not found', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ city: 'Shanghai' });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(0);
    });
    it ('should return results when artinfo is not found', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ artinfo: '4' });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(0);
    });
    it ('should return results when timeline is not found', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({ timeline: [10000,20000] });

        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf(0);
    });

})
