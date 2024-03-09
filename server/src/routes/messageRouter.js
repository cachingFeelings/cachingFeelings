import express from 'express';
import { decodeJWT } from '../config/auth.js'
import { batchGetMessages, getMessages, sendMessage, updateSeen } from '../controllers/messageController.js';

const router = express.Router();

router.get('/batchGetMessages', decodeJWT, batchGetMessages);
router.get('/getMessage', decodeJWT, getMessages);
router.post('/sendMessage', decodeJWT, sendMessage);
router.post('/updateSeen', decodeJWT, updateSeen);

export default router;
