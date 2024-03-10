import express from 'express';
import { getConvos, createConvo } from '../controllers/convoController.js';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/getConvos', decodeJWT, getConvos);
router.post('/newConvo', decodeJWT, createConvo);

export default router;
