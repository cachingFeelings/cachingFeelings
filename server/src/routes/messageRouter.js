import express from 'express';
import { decodeJWT } from '../config/auth.js'
import { batchGetMessages, getMessages, postMessage, updateSeen } from '../controllers/messageController.js';

const router = express.Router();

router.get('/batchGetMessages', decodeJWT, batchGetMessages);
router.get('/getMessage', decodeJWT, getMessages);
router.post('/postMessage', decodeJWT, postMessage);
router.post('/updateSeen', decodeJWT, updateSeen);

export default router;
