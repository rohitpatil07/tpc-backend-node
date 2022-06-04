import { Router } from 'express';
import eligibilityControllers from '../controllers/eligibilityControllers.js';

const router = Router();
router.get('/top10student', eligibilityControllers.getEligibleStudents);
router.get('/companyWisePackage', eligibilityControllers.getCompanyWisePackage);

export default router;
