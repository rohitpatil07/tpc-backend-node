import { Router } from 'express';
import filterRoutes from './filter.js';
import downloadRoutes from './download.js';
import downloadCsvRoutes from './downloadcsv.js';

const router = Router();
router.use('/filter', filterRoutes);
router.use('/download', downloadRoutes);
router.use('/downloadcsv', downloadCsvRoutes);

export default router;
