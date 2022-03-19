import { Router } from 'express';
import downloadCsvControllers from '../controllers/downloadCsvControllers.js';

const router = Router();

router.post('/', downloadCsvControllers.download);

export default router;
