import filterService from '../services/filterservice.js';

const getAllStudents = async (req, res) => {
  try {
    let students = await filterService.getAllStudents();
    res.json({ students: students });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getStudentByRoll = async (req, res) => {
  try {
    let rollnumber = String(req.params.rollno);
    let students = await filterService.getStudentByRoll(rollnumber);
    res.json({ students: students });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getStudentsByDept = async (req, res) => {
  try {
    let dept = String(req.params.dept);
    let students = await filterService.getStudentsByDept(dept);
    res.json({ students: students });
  } catch (error) {
    res.json(error);
  }
};

export default { getAllStudents, getStudentByRoll, getStudentsByDept };
