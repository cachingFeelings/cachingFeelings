import request from 'supertest';
import app from '../src/app.js';

describe('Image API', () => {
    describe('POST /generateUploadUrls', () => {
        it('should return upload URLs for files', async () => {
            // This is a bit tricky because generating URLs typically requires actual file details
            // For testing purposes, we might mock the files or send dummy file details
            const response = await request(app)
                .post('/api/image/generateUploadUrls')
                .send({
                    files: [
                        { name: "test_image.jpg", type: "image/jpeg" },
                        { name: "test_document.pdf", type: "application/pdf" }
                    ]
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.files).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        uploadURL: expect.any(String),
                        objectKey: expect.any(String)
                    })
                ])
            );
        });

        it('should return 400 if no files are provided', async () => {
            const response = await request(app)
                .post('/api/image/generateUploadUrls')
                .send({ files: [] });

            expect(response.statusCode).toBe(400);
            expect(response.text).toEqual("Where the files at?");
        });
    });

    describe('POST /getImageURL', () => {
        it('should return an image URL for a given file name', async () => {
            // Assume a file name that exists in your bucket
            const fileName = "uploads/123456789-test_image.jpg";
            const response = await request(app)
                .post('/api/image/getImageURL')
                .send({ fileName });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('url');
        });

        it('should return 400 if fileName is invalid or missing', async () => {
            const response = await request(app)
                .post('/api/image/getImageURL')
                .send({}); // No fileName provided

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Error message from AWS if applicable');
        });
    });
});
