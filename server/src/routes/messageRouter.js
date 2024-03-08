import express from 'express';
import { decodeJWT } from '../config/auth.js'
import { batchGetMessages } from '../controllers/messageController.js';

const router = express.Router();

router.get('/batchGetMessages', decodeJWT, batchGetMessages);
router.get('/getMessage', decodeJWT, );
router.post('/sendMessage', decodeJWT, );

export default router;
