import express from 'express';
import { decodeJWT } from '../config/auth.js'

const router = express.Router();

// router.get('/convo', decodeJWT, createUser);

export default router;
