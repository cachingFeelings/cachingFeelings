import express from 'express';
import { getPosts, newPost, testDate } from '../controllers/communityController.js';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/getPosts', decodeJWT, getPosts);
router.post('/newPost', decodeJWT, newPost);
router.get('/testDate', testDate);

export default router;