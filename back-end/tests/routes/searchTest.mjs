import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app.mjs'
import e from 'express'

chai.use(chaiHttp)
const expect = chai.expect


// TODO:
// 1) test if we have artinfo and timeline
// 2) test if we have only timeline

let arts = [
    // Sample data structure
    { id: '1', city: 'NewYork', name: 'art1', author: '1XXXXXX', year: 1222, url: 'https://picsum.photos/200', inFavList: false },
    { id: '2', city: 'Paris', name: 'art2', author: '2XXXXXX', year: 2333, url: 'https://picsum.photos/200', inFavList: false },
    { id: '3', city: 'London', name: 'art3', author: '3XXXXXX', year: 2222, url: 'https://picsum.photos/200', inFavList: false },
];

describe('SearchTest', () => {
    it('should return results when all parameters are provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({artinfo: 'Yiannis', timeRange: '1000,2020' });
        expect(response).to.have.status(200);
        console.log(response.body);
    });
    it ('should return results when only timeline is provided', async () => {
        const response = await chai.request(app)
            .get('/search')
            .query({timeRange: '1000,2020' });
        expect(response).to.have.status(200);
        console.log(response.body);
    });
})
