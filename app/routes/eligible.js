import { Router } from 'express';
import eligibilityControllers from '../controllers/eligibilityControllers.js';

const router = Router();
router.get('/top10student', eligibilityControllers.getEligibleStudents);
router.get('/studentsplacedcompanywise',eligibilityControllers.getSelectedStudentsCompanyWise);
router.get('/studentsplacedlpawise',eligibilityControllers.getSelectedStudentsLpaWise);

export default router;
