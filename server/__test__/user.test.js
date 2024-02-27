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

    it('should return a 400 error for missing username or password', async () => {
        const response = await request(app)
            .post('/api/user/create_user') 
            .send({
                data: {
                    username: 'testUser',
                    // Bad Input
                }
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Username and password are required.");
    });

    it('should return a 400 bad request for duplicate username', async () => {
        const response = await request(app)
            .post('/api/user/create_user') 
            .send({
                data: {
                    username: 'testUser',
                    password: 'testPassword',
                }
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("E11000 duplicate key error collection: test.users index: username_1 dup key: { username: \"testUser\" }");
    })
});

describe ('POST /login', () =>{
    it('should return a valid token and user data', async ()=>{
        const response = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'testUser',
            password: 'testPassword',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('token');
    })

    it('should return a 401 unauthorized for wrong password', async ()=>{  
        const response = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'testUser',
            password: 'wrongPass',
        });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual("That ain't gonna work here chief");
    })

    it('should return a 404 for bad username', async ()=>{  
        const response = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'badUser',
            password: 'testPassword',
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("You don't exist...yet.");
    })

    it('should return a 400 for not including password', async ()=>{  
        const response = await request(app)
        .post('/api/user/login') 
        .send({
            username: 'testUser'
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("Illegal arguments: undefined, string");
    })
})

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
            .get('/api/user/getUser')
            .set('Authorization', `Bearer ${token}`)
            .send({ _id: userID });

        expect(response.statusCode).toBe(201);
        expect(response.body.userObj).toBeDefined();
        expect(response.body.userObj).not.toHaveProperty('password');
    });

    it('should return a 404 error for an invalid user id', async () => {
        const invalidUserID = 'someInvalidUserID';

        const response = await request(app)
            .get('/api/user/getUser')
            .set('Authorization', `Bearer ${token}`) // Use the same token
            .send({ _id: invalidUserID });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("Who you tryna contact? The wind?");
    });

    it('should return a 401 error for missing or invalid token', async () => {
        const response = await request(app)
            .get('/api/user/getUser')
            .send({ _id: 'anyUserID' }); // No Authorization header set

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toEqual("Please authenticate.");
    });
});



