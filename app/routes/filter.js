import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';

const router = Router();
router.get('/', filterControllers.home);

export default router;
