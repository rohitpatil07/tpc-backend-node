import { Router } from 'express';
import filterRoutes from './filter.js';
import eligibleRoutes from './eligible.js';
import downloadRoutes from './download.js';
import downloadCsvRoutes from './downloadcsv.js';
import downloadZipRoutes from './downloadzip.js';

const router = Router();
router.use('/filter', filterRoutes);
router.use('/download', downloadRoutes);
router.use('/eligible', eligibleRoutes);
router.use('/downloadcsv', downloadCsvRoutes);
router.use('/downloadresume',downloadZipRoutes);

export default router;
