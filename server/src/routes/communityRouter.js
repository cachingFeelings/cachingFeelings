import express from 'express';
import { getPosts, newPost } from '../controllers/communityController.js';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/getPosts', decodeJWT, getPosts);
router.post('/newPost', decodeJWT, newPost);

export default router;