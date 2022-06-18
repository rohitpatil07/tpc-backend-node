import { Router } from 'express';
import imageControllers from '../controllers/imageControllers.js';

const router = Router();
router.get('/download/:roll_no', imageControllers.downloadImage);
router.post('/upload/:roll_no', imageControllers.uploadImage);
export default router;
