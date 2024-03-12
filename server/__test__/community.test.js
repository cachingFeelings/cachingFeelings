import request from 'supertest';
import app from '../src/app.js';


describe('POST /create_user', () => {
    it('should create a new user and return a token', async () => {
        const response = await request(app)
            .post('/api/user/create_user') 
            .send({
                data: {
                    username: 'testUser',
                    password: 'testPassword',
                }
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
    });
});


describe('GET /getUser', () => {
    let token;
    let userID;
    let postId;

    beforeAll(async () => {
        const response = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'testUser',
            password: 'testPassword',
        });

        const respond = await request(app)
            .post('/api/community/newPosts')
            .set('Authorization', `Bearer ${token}`)
            .send({"body":"Testing" });

        token = response.body.token;
        userID = response.body.userObj._id;
        postId = respond.body._id;
    });

    it('should return 201 and contents of new post', async () => {

        const response = await request(app)
            .post('/api/community/newPosts')
            .set('Authorization', `Bearer ${token}`)
            .send({body:"hello" });

        expect(response.statusCode).toBe(201);
    });

    it('should return 201 and contents of new post', async () => {

        const response = await request(app)
            .get('/api/community/getPosts')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.statusCode).toBe(201);
    });

    it('should return 201 and should like the post', async () => {

        const response = await request(app)
            .post('/api/community/likeDislikePosts')
            .set('Authorization', `Bearer ${token}`)
            .send({postID:postId,
                    like: true});

        expect(response.statusCode).toBe(201);
    });
    
    it('should return 201 and should report the post', async () => {

        const response = await request(app)
            .post('/api/community/reportPosts')
            .set('Authorization', `Bearer ${token}`)
            .send({postID:postId,
                    report: true});

        expect(response.statusCode).toBe(201);
    });

    it('should return 201 and should delete the post', async () => {

        const response = await request(app)
            .post('/api/community/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({postID:postId});

        expect(response.statusCode).toBe(201);
    });
});