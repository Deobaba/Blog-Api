const app = require('../app');
const request = require('supertest');
const connectDB = require('../config/db');
const User = require('../src/models/user');
const { default: mongoose } = require('mongoose');

//connecting to the database
connectDB();

//testing all the user routes
describe('Testing all the user routes', () => {
    let userId;

    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });


    //testing the signup route
    it('should create a new user', async () => {
        const response = await request(app).post('/signup').send({
            first_name: 'john',
            last_name: 'doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });
        expect(response.status).toBe(200);
        expect(response.body.user).toHaveProperty('blog');
    });

    //testing the login route
    it('should login a user', async () => {
        const response = await request(app).post('/login').send({email: 'johndoe@gmail.com',
        password: '123456'});
        userId = response.body.user._id
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
    });

});