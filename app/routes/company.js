import { Router } from 'express';
import companyControllers from '../controllers/companyControllers.js';

const router = Router();

router.get('/', companyControllers.lookup)
router.get('/download', companyControllers.download);

export default router;
