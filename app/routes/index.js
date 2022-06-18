import { Router } from 'express';
import filterRoutes from './filter.js';
import eligibleRoutes from './eligible.js';
import downloadRoutes from './download.js';
import downloadCsvRoutes from './downloadcsv.js';
import downloadZipRoutes from './downloadzip.js';
import companyRoutes from './company.js';
import imageRoutes from './image.js';

const router = Router();
router.use('/filter', filterRoutes);
router.use('/download', downloadRoutes);
router.use('/eligible', eligibleRoutes);
router.use('/downloadcsv', downloadCsvRoutes);
router.use('/downloadresume', downloadZipRoutes);
router.use('/company', companyRoutes);
router.use('/image', imageRoutes);

export default router;
