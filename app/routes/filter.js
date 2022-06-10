import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';

const router = Router();
router.get('/', filterControllers.getAllStudents);
router.get('/:rollno', filterControllers.getStudentByRoll);
router.get('/dept/:dept', filterControllers.getStudentsByDept);
router.get('/profile/:rollno', filterControllers.getStudentProfile);
router.post('/dashboard', filterControllers.dashboardFilter);
router.post(
  '/dashboard/:page&:limit',
  filterControllers.paginatedDashboardFilter,
);
router.post('/cgpa', filterControllers.cgpaGreater);
router.post('/notifstudents', filterControllers.getNotifStudents);

export default router;
