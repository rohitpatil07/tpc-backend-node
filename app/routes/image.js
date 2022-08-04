import { Router } from 'express';
import imageControllers from '../controllers/imageControllers.js';

const router = Router();
router.get('/download/:roll_no', imageControllers.downloadImage);
router.post('/upload/:roll_no', imageControllers.uploadImage);
router.get('/offerdownload/:roll_no/:number', imageControllers.offerdownload);
router.post('/offerupload/:roll_no/:number', imageControllers.offerupload);
export default router;
