import filterService from '../services/filterservice.js';

const getAllStudents = async (req, res) => {
  try {
    let data = await filterService.getAllStudents();
    res.json({ result: data });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getStudentByRoll = async (req, res) => {
  try {
    let rollnumber = String(req.params.rollno);
    let data = await filterService.getStudentByRoll(rollnumber);
    res.json({ result: data });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export default { getAllStudents, getStudentByRoll };
