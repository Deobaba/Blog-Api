const request = require('supertest')
const app = require('../app');


describe('Home Route', () => {
    it('my home blog?get', async () => {
        const response = await request(app).get('/home').set('content-type', 'application/json')
        expect(response.status).toBe(200)
    })

});
