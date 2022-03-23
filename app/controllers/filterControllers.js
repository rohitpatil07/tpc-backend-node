import filterService from '../services/filterservice.js';
import objectify from '../util/objectify.js';

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

const getStudentsByCustom = async (req, res) => {
  try {
    let deptartment = String(req.params.dept);
    let gender = String(req.params.gender);
    let h= objectify.makect(gender,deptartment);
    console.log(h);
    let students = await filterService.getStudentsByCustom(h);
    res.json({ students: students });
  } catch (error) {
    res.json(error);
  }
};

const getStudentsByUltimate = async (req, res) => {
  try {
    //let dept = String(req.params.dept);
    object_select=objectify.ultimo_select(req.body.select);
    object_where=objectify.ultimo_where(req.body.where);
    let students = await filterService.getStudentsByUltimate(object_select,object_where);
    res.json({ students: students });
  } catch (error) {
    res.json(error);
  }
}

export default {
  getAllStudents,
  getStudentByRoll,
  getStudentsByDept,
  getStudentProfile,
  getStudentsByCustom,
  getStudentsByUltimate
};
