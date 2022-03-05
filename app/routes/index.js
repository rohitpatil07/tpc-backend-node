import { Router } from 'express';
import filterRoutes from './filter.js';

const router = Router();
router.use('/filter', filterRoutes);

export default router;
