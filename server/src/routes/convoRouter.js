import express from 'express';
import { getConvo, createConvo } from '../controllers/convoController.js';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/getConvo', decodeJWT, getConvo);
router.post('/newConvo', decodeJWT, createConvo);

export default router;
