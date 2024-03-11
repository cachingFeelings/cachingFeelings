import express from 'express';
import { getPosts, newPosts, likeDislikePosts, reportPosts, deletePosts } from '../controllers/communityController.js';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/getPosts', decodeJWT, getPosts);
router.post('/newPosts', decodeJWT, newPosts);
router.post('/likeDislike', decodeJWT, likeDislikePosts);
router.post('/report', decodeJWT, reportPosts);
router.delete('/delete', decodeJWT, deletePosts);

export default router;