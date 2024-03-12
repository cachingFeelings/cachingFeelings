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

        token = response.body.token;
        userID = response.body.userObj._id;

        const respond = await request(app)
        .post('/api/community/newPosts')
        .set('Authorization', `Bearer ${token}`)
        .send({"body":"Testing" });
        postId = respond.body._id;
    });

    it('should return 201 and send new posts', async () => {

        const response = await request(app)
            .post('/api/community/newPosts')
            .set('Authorization', `Bearer ${token}`)
            .send({body:"hello" });

        expect(response.statusCode).toBe(201);
    });

    it('should return 201 and get posts', async () => {

        const response = await request(app)
            .get('/api/community/getPosts')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.statusCode).toBe(201);
    });

    it('should return 201 and should like the post', async () => {

        const response = await request(app)
            .post('/api/community/likeDislike')
            .set('Authorization', `Bearer ${token}`)
            .send({postID:postId,
                    like: true});

        expect(response.statusCode).toBe(201);
    });


    it('should return an error since postId is not included', async () => {

        const response = await request(app)
            .post('/api/community/likeDislike')
            .set('Authorization', `Bearer ${token}`)
            .send({
                    like: true});

        expect(response.statusCode).toBe(201);
    });


    it('should return 201 and should like the post', async () => {

        const response = await request(app)
            .post('/api/community/likeDislike')
            .set('Authorization', `Bearer ${token}`)
            .send({postID:postId,
                    like: false});

        expect(response.statusCode).toBe(201);
    });
    
    it('should return 201 and should report the post', async () => {

        const response = await request(app)
            .post('/api/community/report')
            .set('Authorization', `Bearer ${token}`)
            .send({postID:postId,
                    report: true});

        expect(response.statusCode).toBe(201);
    });

    it('should return 401 if token is not included or misspelt', async () => {

        const response = await request(app)
            .post('/api/community/report')
            .send({postID:postId,
                    report: true});

        expect(response.statusCode).toBe(401);
    });

    it('should return 201 and should delete the post', async () => {

        const response = await request(app)
            .delete('/api/community/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({postID:postId});

        expect(response.statusCode).toBe(201);
    });
});