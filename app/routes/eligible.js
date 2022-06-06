import { Router } from 'express';
import eligibilityControllers from '../controllers/eligibilityControllers.js';

const router = Router();
router.get('/top10student', eligibilityControllers.getTopPlacedStudents);
router.get('/offercount',eligibilityControllers.getofferCount);
router.get(
  '/studentsplacedcompanywise',
  eligibilityControllers.getSelectedStudentsCompanyWise,
);
router.get(
  '/studentsplacedlpawise',
  eligibilityControllers.getSelectedStudentsLpaWise,
);
router.get('/companyWisePackage', eligibilityControllers.getCompanyWisePackage);

export default router;
