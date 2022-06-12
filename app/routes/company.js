import { Router } from 'express';
import companyControllers from '../controllers/companyControllers.js';

const router = Router();

router.get('/', companyControllers.lookup)
router.post('/download', companyControllers.download);

export default router;