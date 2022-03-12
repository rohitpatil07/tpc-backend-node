import { Router } from 'express';
import filterRoutes from './filter.js';
import downloadRoutes from './download.js';

const router = Router();
router.use('/filter', filterRoutes);
router.use('/download', downloadRoutes);

export default router;
