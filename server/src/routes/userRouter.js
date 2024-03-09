import express from 'express';
import { createUser, login, validUsername, getMatches, getUserData, modifyUser, likeDislike, getLikes, getCurrentUserId } from '../controllers/userController.js'
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.post('/create_user', createUser);
router.post('/validate', validUsername); 
router.post('/login', login)

// Use the decodeJWT middleware 
router.get('/getMatches', decodeJWT, getMatches)
router.get('/getUser', decodeJWT, getUserData)
router.post('/modifyUser', decodeJWT, modifyUser)
router.post('/likeDislike', decodeJWT, likeDislike)
router.get('/getLikes',decodeJWT, getLikes)
router.get('/getCurrentUserId', decodeJWT, getCurrentUserId)
// router.post('/startConvo', decodeJWT, startConvo)


export default router;
