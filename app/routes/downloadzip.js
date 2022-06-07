import { Router } from 'express';
import downloadZipControllers from '../controllers/downloadZipControllers.js';

const router = Router();

router.post('/', downloadZipControllers.resumeDownload)
router.post('/zip', downloadZipControllers.zipDownload);

export default router;
