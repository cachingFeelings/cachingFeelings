import request from 'supertest';
import app from '../src/app.js';

describe('POST /create_user', () => {
    it('should create a new user and return a token', async () => {
        const response = await request(app)
            .post('/api/user/create_user') 
            .send({
                data: {
                    username: 'test1User',
                    password: 'test1Password',
                }
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should create a new user and return a token', async () => {
        const response = await request(app)
            .post('/api/user/create_user') 
            .send({
                data: {
                    username: 'test1User',
                    password: 'test1Password',
                }
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
    });
});


describe('GET /getUser', () => {
    let token;
    let userID;
    let token2;
    let userID2;

    beforeAll(async () => {
        const response = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'test1User',
            password: 'test1Password',
        });
        token = response.body.token;
        userID = response.body.userObj._id;

        const respond = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'test2User',
            password: 'test2Password',
        });

    token2 = respond.body.token;
    userID2 = respond.body.userObj._id;
});

it('user 1 should like user 2', async () => {
    const response = await request(app)
        .post('/api/user/likeDislike')
        .set('Authorization', `Bearer ${token}`)
        .send({
            _id: userID2,
            like: true
        });

    // Check if the response status code is 201 (Created) or other if your API behaves differently
    expect(response.statusCode).toBe(201);
    // Add any other expectations here. For example, checking the response body if necessary
    // e.g., expect(response.body.message).toEqual("Liked successfully");
});

it('user 2 should like user 1', async () => {
    const response = await request(app)
        .post('/api/user/likeDislike')
        .set('Authorization', `Bearer ${token2}`)
        .send({
            _id: userID,
            like: true
        });

    // Check if the response status code is 201 (Created) or other if your API behaves differently
    expect(response.statusCode).toBe(201);
    // Add any other expectations here. For example, checking the response body if necessary
    // e.g., expect(response.body.message).toEqual("Liked successfully");
});
});