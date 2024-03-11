// import request from 'supertest';
// import app from '../src/app.js';

// // Helper function to create a user and return the token
// const createUserAndGetToken = async (username, password) => {
//     const response = await request(app)
//         .post('/api/user/create_user')
//         .send({
//             data: {
//                 username: username,
//                 password: password
//             }
//         });
//     return response.body.token; // Assuming the token is directly accessible here
// };

// // Helper function to send like from one user to another
// const sendLike = async (token, targetUserId, like = true) => {
//     await request(app)
//         .post('/api/user/likeDislike')
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             _id: targetUserId,
//             like: like
//         });
// };



// describe('GET /getUser', () => {
//     let token;
//     let userID;
//     let token2;
//     let userID2;

//     beforeAll(async () => {
//         const response = await request(app)
//         .post('/api/user/login') 
//         .send({
//             username: 'testUser',
//             password: 'testPassword',
//         });
//         token = response.body.token;
//         userID = response.body.userObj._id;

//         const respond = await request(app)
//         .post('/api/user/login') 
//         .send({
//             username: 'testUser',
//             password: 'testPassword',
//         });
//     });

//     token = respond.body.token;
//     userID = respond.body.userObj._id;

//     it('should return 201 and user data for a valid user id and token', async () => {

//         const response = await request(app)
//             .get('/api/user/getUser')
//             .set('Authorization', `Bearer ${token}`)
//             .send({ _id: userID });

//         expect(response.statusCode).toBe(201);
//         expect(response.body.userObj).toBeDefined();
//         expect(response.body.userObj).not.toHaveProperty('password');
//     });

//     it('should return a 404 error for an invalid user id', async () => {
//         const invalidUserID = 'someInvalidUserID';

//         const response = await request(app)
//             .get('/api/user/getUser')
//             .set('Authorization', `Bearer ${token}`) // Use the same token
//             .send({ _id: invalidUserID });

//         expect(response.statusCode).toBe(404);
//         expect(response.body.message).toEqual("Who you tryna contact? The wind?");
//     });

//     it('should return a 401 error for missing or invalid token', async () => {
//         const response = await request(app)
//             .get('/api/user/getUser')
//             .send({ _id: 'anyUserID' }); // No Authorization header set

//         expect(response.statusCode).toBe(401);
//         expect(response.body.message).toEqual("Please authenticate.");
//     });
// });




















// // Messages unit test
// describe('Messages', () => {
//     let user1Token, user2Token, user2Id, user1Id, messageId;


// beforeAll(async () => {
//     it('should create a new user and return a token', async () => {
//         const response = await request(app)
//             .post('/api/user/create_user') 
//             .send({
//                 data: {
//                     username: 'testUser',
//                     password: 'testPassword',
//                 }
//             });
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('token');
//     });


//     // Test for creating a user and getting a token
//     it('should create user1 and return a token', async () => {
//         const createUserResponse = await request(app)
//             .post('/api/user/create_user')
//             .send({
//                 data: {
//                     username: 'testingUser1',
//                     password: 'password1',
//                 }
//             });
//         expect(createUserResponse.statusCode).toBe(201);
//         expect(createUserResponse.body).toHaveProperty('token');
//         user1Token = createUserResponse.body.token; // Store token for later tests
//         user1Id = createUserResponse.body.userObj._id;
//     });

//     it('should create user2 and return a token', async () => {
//         const createUserResponse = await request(app)
//             .post('/api/user/create_user')
//             .send({
//                 data: {
//                     username: 'testingUser2',
//                     password: 'password2'
//                 }
//             });
//         expect(createUserResponse.statusCode).toBe(201);
//         expect(createUserResponse.body).toHaveProperty('token');
//         user2Token = createUserResponse.body.token; // Store token for later tests
//         user2Id = createUserResponse.body.userObj._id;
//     });

// });

//     it('user 1 should like user 2', async () => {
//         const response = await request(app)
//             .post('/api/user/likeDislike')
//             .set('Authorization', `Bearer ${user1Token}`)
//             .send({
//                 _id: user2Id,
//                 like: true
//             });

//         // Check if the response status code is 201 (Created) or other if your API behaves differently
//         expect(response.statusCode).toBe(201);
//         // Add any other expectations here. For example, checking the response body if necessary
//         // e.g., expect(response.body.message).toEqual("Liked successfully");
//     });

//     it('user 2 should like user 1', async () => {
//         const response = await request(app)
//             .post('/api/user/likeDislike')
//             .set('Authorization', `Bearer ${user2Token}`)
//             .send({
//                 _id: user1Id,
//                 like: true
//             });

//         // Check if the response status code is 201 (Created) or other if your API behaves differently
//         expect(response.statusCode).toBe(201);
//         // Add any other expectations here. For example, checking the response body if necessary
//         // e.g., expect(response.body.message).toEqual("Liked successfully");
//     });
//     // beforeAll(async () => {
//     //     const response = await request(app)
//     //     .post('/api/user/login') 
//     //     .send({
//     //         username: 'testUser',
//     //         password: 'testPassword',
//     //     });
//     //     token = response.body.token;
//     //     userID = response.body.userObj._id;
//     // });


//     // // Test for retrieving the current user ID using the token
//     // it('should get current user ID for user1 using the token', async () => {
//     //     const getCurrentUserIdResponse = await request(app)
//     //         .get('/api/user/getCurrentUserId')
//     //         .set('Authorization', `Bearer ${user1Token}`);
//     //     expect(getCurrentUserIdResponse.statusCode).toBe(200);
//     //     expect(getCurrentUserIdResponse.body).toHaveProperty('_id');
//     //     user1Id = getCurrentUserIdResponse.body._id; // Store user ID for later reference
//     // });

//     // it('should get current user ID for user2 using the token', async () => {
//     //     const getCurrentUserIdResponse = await request(app)
//     //         .get('/api/user/getCurrentUserId')
//     //         .set('Authorization', `Bearer ${user2Token}`);
//     //     expect(getCurrentUserIdResponse.statusCode).toBe(200);
//     //     expect(getCurrentUserIdResponse.body).toHaveProperty('_id');
//     //     user2Id = getCurrentUserIdResponse.body._id; // Store user ID for later reference
//     // });

//     //Unit test for sending a message from user1 to user2
//     // it('should send a message from user1 to user2', async () => {
//     //     const sendMessageResponse = await request(app)
//     //         .post('/api/message/sendMessage')
//     //         .set('Authorization', `Bearer ${user1Token}`)
//     //         .send({
//     //             body: 'Hello, user2!',
//     //             to: user2Id
//     //         });
//     //     expect(sendMessageResponse.statusCode).toBe(201);
//     //     messageId = sendMessageResponse.body._id; // Store messageId for later tests
//     //     expect(sendMessageResponse.body.from).toEqual(user1Id); // Assuming we have user1Id
//     //     expect(sendMessageResponse.body.to).toEqual(user2Id);
//     // });

//     // // Unit test for batch getting messages
//     // it('should batch get messages', async () => {
//     //     const batchGetResponse = await request(app)
//     //         .get('/api/message/batchGetMessages')
//     //         .set('Authorization', `Bearer ${user1Token}`)
//     //         .send({
//     //             messageIDs: [messageId] // Using the messageId from previous test
//     //         });
//     //     expect(batchGetResponse.statusCode).toBe(201);
//     //     expect(batchGetResponse.body.listMessages.length).toBeGreaterThan(0);
//     // });

//     // // Unit test for getting a single message by ID
//     // it('should get a message by ID', async () => {
//     //     const getMessageResponse = await request(app)
//     //         .get(`/api/message/getMessages?messageID=${messageId}`)
//     //         .set('Authorization', `Bearer ${user1Token}`);
//     //     expect(getMessageResponse.statusCode).toBe(201);
//     //     expect(getMessageResponse.body._id).toEqual(messageId);
//     // });

//     // // Unit test for updating a message as seen
//     // it('should update message as seen', async () => {
//     //     const updateSeenResponse = await request(app)
//     //         .post('/api/message/updateSeen')
//     //         .set('Authorization', `Bearer ${user1Token}`)
//     //         .send({
//     //             messageID: messageId
//     //         });
//     //     expect(updateSeenResponse.statusCode).toBe(201);
//     //     expect(updateSeenResponse.body.seen).toBe(true);
//     // });
// });
