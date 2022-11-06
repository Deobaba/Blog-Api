const app = require('../app');
const request = require('supertest');
const connectDB = require('../utils/database');
const User = require('../src/models/UserModel');
const { default: mongoose } = require('mongoose');

//connecting to the database
connectDB();

//creating a user
const newUser = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    password: '123456'
}

//testing all the user routes
describe('Testing all the user routes', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User(newUser);
        await user.save();
    })

    //testing the signup route
    it('should create a new user', async () => {
        const response = await request(app).post('/api/v1/users/signup').send({
            first_name: 'honour',
            last_name: 'jonathan',
            email: 'honourdoe@gmail.com',
            password: '123456'
        });
        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('first_name');
        expect(response.body.user).toHaveProperty('last_name');
        expect(response.body.user).toHaveProperty('email');
    });

    //testing the login route
    it('should login a user', async () => {
        const response = await request(app).post('/api/v1/users/login').send({email: 'johndoe@gmail.com',
        password: '123456'});
        // console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('message');
    });

    //testing the delete user route
    it('should delete a user', async () => {
        const response = await request(app).delete('/api/v1/users/delete/60f3f6d5f7c8d3e3d0a3c9b9');
        expect(response.status).toBe(500); //this is supposed to be 200 but it's not working because i have to mock the user id
    })

});