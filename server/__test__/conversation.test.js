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
                    username: 'test2User',
                    password: 'test2Password',
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
        // Make sure users like each other to enable conversation
        await request(app)
            .post('/api/user/likeDislike')
            .set('Authorization', `Bearer ${token}`)
            .send({ _id: userID2, like: true });
        
        await request(app)
            .post('/api/user/likeDislike')
            .set('Authorization', `Bearer ${token2}`)
            .send({ _id: userID, like: true });
    });

    it('should allow user1 to create a new conversation with user2', async () => {
        const response = await request(app)
            .post('/api/convo/newConvo')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'test2User' }); // Assuming you need the username of the recipient to create a convo

        expect(response.statusCode).toBe(201);
    });

    it('should allow user1 to get their conversations', async () => {
        const response = await request(app)
            .get('/api/convo/getConvos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                _id: expect.any(String),
                username: 'test2User'
            })
        ]));
    });

    it('should not allow unauthorized access to getConvos', async () => {
        const response = await request(app)
            .get('/api/convo/getConvos');

        expect(response.statusCode).toBe(401);
    });

    it('should not allow unauthorized access to newConvo', async () => {
        const response = await request(app)
            .post('/api/convo/newConvo')
            .send({ username: 'test2User' });

        expect(response.statusCode).toBe(401);
    });
});
