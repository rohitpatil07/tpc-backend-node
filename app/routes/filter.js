import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';

const router = Router();
router.get('/', filterControllers.getAllStudents);
router.get('/:rollno', filterControllers.getStudentByRoll);
router.get('/dept/:dept', filterControllers.getStudentsByDept);
router.get('/profile/:rollno', filterControllers.getStudentProfile);
router.get('/gender/:gender/:dept', filterControllers.getStudentsByCustom);
router.post('/Ultimate',filterControllers.getStudentsByUltimate);

export default router;
