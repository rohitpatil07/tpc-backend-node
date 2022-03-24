import filterService from '../services/filterservice.js';
import objectify from '../util/objectUtility.js';

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
    let student = await filterService.getStudentByRoll(rollnumber);
    res.json({ student: student });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getStudentProfile = async (req, res) => {
  try {
    let rollnumber = String(req.params.rollno);
    let student = await filterService.getStudentProfile(rollnumber);
    res.json({ student: student });
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

const dashboardFilter = async (req, res) => {
  try {
    let data = req.body;
    let select_fields = await objectify(data);
    let where_queries = data.queries;
    let student = await filterService.dashboardFilter(
      where_queries,
      select_fields,
    );
    console.log(student);
    res.json({ student: student });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const cgpaGreater = async(req,res)=>{
  try{
    let data = req.params.data;
    let student = await filterService.cgpaGreater(data);
    res.json({ student: student });
  }
  catch (error) {
    console.log(error);
    res.json(error);
  }
}

export default {
  getAllStudents,
  getStudentByRoll,
  getStudentsByDept,
  getStudentProfile,
  dashboardFilter,
  cgpaGreater,
};
