import express from 'express';
import { getConvo } from '../controllers/convoController.js';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/getConvo', decodeJWT, getConvo);

export default router;
