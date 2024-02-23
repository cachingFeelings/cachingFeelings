import express from 'express';
import { createUser, login, getMatches, getUserData } from '../controllers/userController.js'
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.post('/create_user', createUser);
router.post('/login', login)

// Use the decodeJWT middleware 
router.post('/getMatches', decodeJWT, getMatches)
router.post('/getUser', decodeJWT, getUserData)

export default router;