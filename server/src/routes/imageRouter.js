import express from 'express';
import { generateUploadURLs, getImageURL } from '../controllers/imageController.js';

const router = express.Router();

router.post('/generateUploadUrls', generateUploadURLs);
router.get('/getImageURL', getImageURL);

export default router;
