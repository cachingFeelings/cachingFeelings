describe('GET /getUser', () => {
    let token;
    let userID;

    beforeAll(async () => {
        const response = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'testUser',
            password: 'testPassword',
        });
        token = response.body.token;
        userID = response.body.userObj._id;
    });

    it('should return 201 and user data for a valid user id and token', async () => {

        const response = await request(app)
            .post('/api/community/newPosts')
            .set('Authorization', `Bearer ${token}`)
            .send({"body":"hello" });

        expect(response.statusCode).toBe(201);
    });
});