import request from 'supertest';
import app from '../src/app.js';

// Helper function to create a user and return the token
const createUserAndGetToken = async (username, password) => {
    const response = await request(app)
        .post('/api/user/create_user')
        .send({
            data: {
                username: username,
                password: password
            }
        });
    return response.body.token; // Assuming the token is directly accessible here
};

// Helper function to send like from one user to another
const sendLike = async (token, targetUserId, like = true) => {
    await request(app)
        .post('/api/user/likeDislike')
        .set('Authorization', `Bearer ${token}`)
        .send({
            _id: targetUserId,
            like: like
        });
};

// Messages unit test
describe('Messages', () => {
    let user1Token, user2Id, user1Id, messageId;

    beforeAll(async () => {
        // Create two users and get their tokens/IDs
        user1Token = await createUserAndGetToken('user1', 'password1');

        const user1Response = await request(app)
            .get('/api/user/getCurrentUserId')
            .set('Authorization', `Bearer ${user1Token}`);
        user1Id = user1Response.body._id;

        const user2Token = await createUserAndGetToken('user2', 'password2');

        // Extract user2 ID from token if possible or create a helper to fetch it
        // Assuming we have a way to get the current user's ID from the token
        const user2Response = await request(app)
            .get('/api/user/getCurrentUserId')
            .set('Authorization', `Bearer ${user2Token}`);
        user2Id = user2Response.body._id;

        // Send likes to each other to match
        await sendLike(user1Token, user2Id);
        await sendLike(user2Token, user1Id); // Assuming we have user1Id similarly fetched
    });

    // Unit test for sending a message from user1 to user2
    it('should send a message from user1 to user2', async () => {
        const sendMessageResponse = await request(app)
            .post('/api/message/sendMessage')
            .set('Authorization', `Bearer ${user1Token}`)
            .send({
                body: 'Hello, user2!',
                to: user2Id
            });
        expect(sendMessageResponse.statusCode).toBe(201);
        messageId = sendMessageResponse.body._id; // Store messageId for later tests
        expect(sendMessageResponse.body.from).toEqual(user1Id); // Assuming we have user1Id
        expect(sendMessageResponse.body.to).toEqual(user2Id);
    });

    // Unit test for batch getting messages
    it('should batch get messages', async () => {
        const batchGetResponse = await request(app)
            .get('/api/message/batchGetMessages')
            .set('Authorization', `Bearer ${user1Token}`)
            .send({
                messageIDs: [messageId] // Using the messageId from previous test
            });
        expect(batchGetResponse.statusCode).toBe(201);
        expect(batchGetResponse.body.listMessages.length).toBeGreaterThan(0);
    });

    // Unit test for getting a single message by ID
    it('should get a message by ID', async () => {
        const getMessageResponse = await request(app)
            .get(`/api/message/getMessages?messageID=${messageId}`)
            .set('Authorization', `Bearer ${user1Token}`);
        expect(getMessageResponse.statusCode).toBe(201);
        expect(getMessageResponse.body._id).toEqual(messageId);
    });

    // Unit test for updating a message as seen
    it('should update message as seen', async () => {
        const updateSeenResponse = await request(app)
            .post('/api/message/updateSeen')
            .set('Authorization', `Bearer ${user1Token}`)
            .send({
                messageID: messageId
            });
        expect(updateSeenResponse.statusCode).toBe(201);
        expect(updateSeenResponse.body.seen).toBe(true);
    });
});
