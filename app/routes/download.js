import { Router } from 'express';
import downloadControllers from '../controllers/downloadControllers.js';

const router = Router();

router.post('/', downloadControllers.download);

export default router;
