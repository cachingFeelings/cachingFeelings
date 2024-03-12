import request from 'supertest';
import app from '../src/app.js';

describe('Convo Router Tests', () => {
    let token, token2, userID, userID2;

    beforeAll(async () => {
        // Create and log in two users to get their tokens and IDs for testing
        let response = await request(app)
            .post('/api/user/create_user')
            .send({
                data: {
                    username: 'convoUser1',
                    password: 'password1',
                }
            });
        token = response.body.token;
        userID = response.body.userObj._id;

        response = await request(app)
            .post('/api/user/create_user')
            .send({
                data: {
                    username: 'convoUser2',
                    password: 'password2',
                }
            });
        token2 = response.body.token;
        userID2 = response.body.userObj._id;

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
            .send({ username: 'convoUser2' }); // Assuming you need the username of the recipient to create a convo

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
                username: 'convoUser2'
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
            .send({ username: 'convoUser2' });

        expect(response.statusCode).toBe(401);
    });
});
