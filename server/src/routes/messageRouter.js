import express from 'express';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

router.get('/batchGetMessages', decodeJWT, );
router.get('/getMessage', decodeJWT, );
router.post('/addMessage', decodeJWT, );

export default router;
