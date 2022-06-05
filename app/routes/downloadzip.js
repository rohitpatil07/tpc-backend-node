import { Router } from 'express';
import downloadZipControllers from '../controllers/downloadZipControllers.js';

const router = Router();

router.post('/', downloadZipControllers.download);

export default router;
