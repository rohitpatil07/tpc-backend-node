import { Router } from 'express';
import eligibilityControllers from '../controllers/eligibilityControllers.js';

const router = Router();
router.get('/top10student', eligibilityControllers.getEligibleStudents);

export default router;
