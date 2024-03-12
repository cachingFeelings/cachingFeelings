// import request from 'supertest';
// import app from '../src/app.js';

// describe('POST /create_user', () => {
//     it('should create a new user and return a token', async () => {
//         const response = await request(app)
//             .post('/api/user/create_user') 
//             .send({
//                 data: {
//                     username: 'test1User',
//                     password: 'test1Password',
//                 }
//             });
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('token');
//     });

//     it('should create a new user and return a token', async () => {
//         const response = await request(app)
//             .post('/api/user/create_user') 
//             .send({
//                 data: {
//                     username: 'test2User',
//                     password: 'test2Password',
//                 }
//             });
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('token');
//     });
// });


// describe('GET /getUser', () => {
//     let token;
//     let userID;
//     let token2;
//     let userID2;

//     beforeAll(async () => {
//         const response = await request(app)
//         .post('/api/user/login') 
//         .send({
//             username: 'test1User',
//             password: 'test1Password',
//         });
//         token = response.body.token;
//         userID = response.body.userObj._id;

//         const respond = await request(app)
//         .post('/api/user/login') 
//         .send({
//             username: 'test2User',
//             password: 'test2Password',
//         });

//     token2 = respond.body.token;
//     userID2 = respond.body.userObj._id;
// });

// it('message list should be sent', async () => {
//     const response = await request(app)
//         .get('/api/message/batchGetMessages')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             messageIDs:[]
//         });

//     // Check if the response status code is 201 (Created) or other if your API behaves differently
//     expect(response.statusCode).toBe(201);
//     // Add any other expectations here. For example, checking the response body if necessary
//     // e.g., expect(response.body.message).toEqual("Liked successfully");
// });

// //WORKS DON'T KNOW HOW
// it('should return an error', async () => {
//     const response = await request(app)
//         .get('/api/message/batchGetMessages')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
            
//         });

//     // Check if the response status code is 201 (Created) or other if your API behaves differently
//     expect(response.statusCode).toBe(201);
//     // Add any other expectations here. For example, checking the response body if necessary
//     // e.g., expect(response.body.message).toEqual("Liked successfully");
// });

// });


import request from 'supertest';
import app from '../src/app.js';

describe('Complete Message Functionality Tests', () => {
    let tokenUser1, tokenUser2, userId1, userId2, convoId, messageId;

    beforeAll(async () => {
        // Create User 1 and get token
        let res = await request(app)
            .post('/api/user/create_user')
            .send({ data: { username: 'testUser1', password: 'testPassword1' } });
        expect(res.statusCode).toBe(201);
        tokenUser1 = res.body.token;
        userId1 = res.body.userObj._id;

        // Create User 2 and get token
        res = await request(app)
            .post('/api/user/create_user')
            .send({ data: { username: 'testUser2', password: 'testPassword2' } });
        expect(res.statusCode).toBe(201);
        tokenUser2 = res.body.token;
        userId2 = res.body.userObj._id;

        // User 1 likes User 2
        res = await request(app)
            .post('/api/user/likeDislike')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send({ _id: userId2, like: true });
        expect(res.statusCode).toBe(201);

        // User 2 likes User 1
        res = await request(app)
            .post('/api/user/likeDislike')
            .set('Authorization', `Bearer ${tokenUser2}`)
            .send({ _id: userId1, like: true });
        expect(res.statusCode).toBe(201);

        // Create a new conversation between User 1 and User 2
        res = await request(app)
            .post('/api/convo/newConvo')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send({ username: 'testUser2' });
        expect(res.statusCode).toBe(201);
        convoId = res.body._id; // Assuming the response body has the convo ID directly
    });

    it('should post a new message from User 1 to User 2', async () => {
        const res = await request(app)
            .post('/api/message/postMessage')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send({
                body: "Hello from user1 to user2",
                convoID: convoId,
                // Assuming optional fields like mediaLink and burnAfterRead
            });
        expect(res.statusCode).toBe(201);
        messageId = res.body._id; // Store messageId for later use
    });

    it('should get batch of messages for a conversation', async () => {
        const res = await request(app)
            .get(`/api/message/batchGetMessages?convoID=${convoId}`)
            .set('Authorization', `Bearer ${tokenUser1}`);
        expect(res.statusCode).toBe(201); // Adjust according to your implementation
        expect(res.body.messageList).toEqual(expect.any(Array));
    });

    it('should retrieve a specific message by ID', async () => {
        const res = await request(app)
            .get('/api/message/getMessage')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send({ messageID: messageId });
        expect(res.statusCode).toBe(201); // Adjust according to your implementation
        expect(res.body.message._id).toEqual(messageId);
    });

    it('should update message seen status', async () => {
        const res = await request(app)
            .post('/api/message/updateSeen')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send({ messageID: messageId });
        expect(res.statusCode).toBe(201); // Adjust according to your implementation
        // Further assertions can be added based on the response structure
    });

    it('should delete a specific message by ID', async () => {
        const res = await request(app)
            .delete('/api/message/deleteMessage')
            .set('Authorization', `Bearer ${tokenUser1}`)
            .send({ _id: messageId });
        expect(res.statusCode).toBe(201); // Adjust according to your implementation
        // Further assertions can be added to confirm deletion
    });
});
