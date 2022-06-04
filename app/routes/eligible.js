import { Router } from 'express';
import eligibilityControllers from '../controllers/eligibilityControllers.js';

const router = Router();
router.get('/', eligibilityControllers.getEligibleStudents);

export default router;
