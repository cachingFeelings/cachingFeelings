import express from 'express';
import { getPosts, newPosts } from '../controllers/communityController.js';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/getPosts', decodeJWT, getPosts);
router.post('/newPosts', decodeJWT, newPosts);

export default router;