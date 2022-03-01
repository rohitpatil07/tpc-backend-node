import { Router } from 'express';
import filterControllers from '../controllers/filterControllers.js';

const router = Router();
router.get('/', filterControllers.getAllStudents);
router.get('/:rollno', filterControllers.getStudentByRoll);

export default router;
