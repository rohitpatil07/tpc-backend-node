import filterService from '../services/filterservice.js';
import filterify from '../util/filterUtility.js';
import objectify from '../util/objectUtility.js';

const getAllStudents = async (req, res) => {
  try {
    let students = await filterService.getAllStudents();
    res.json({ students: students });
  } catch (error) {
    res.json(error);
  }
};

const getStudentByRoll = async (req, res) => {
  try {
    let rollnumber = String(req.params.rollno);
    let student = await filterService.getStudentByRoll(rollnumber);
    res.json({ student: student });
  } catch (error) {
    res.json(error);
  }
};

const getStudentProfile = async (req, res) => {
  try {
    let rollnumber = String(req.params.rollno);
    let student = await filterService.getStudentProfile(rollnumber);
    res.json({ student: student });
  } catch (error) {
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
    res.json({ student: student });
  } catch (error) {
    res.json(error);
  }
};

const paginatedDashboardFilter = async (req, res) => {
  try {
    let data = req.body;
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    let select_fields = await objectify(data);
    let where_queries = data.queries;
    let results = await filterService.paginatedDashboardFilter(
      where_queries,
      select_fields,
      page,
      limit,
    );

    res.json({ results: results });
  } catch (error) {
    res.json(error);
  }
};

const cgpaGreater = async (req, res) => {
  try {
    let hello = await filterify(req.body);
    let student = await filterService.cgpaGreater(hello);
    res.json({ student: student });
  } catch (error) {
    res.json(error);
  }
};

const getNotifStudents = async (req, res) => {
  try {
    const criteria = req.body;
    let student_list = await filterService.getNotifStudents(criteria);
    return res.json({ student_list });
  } catch (error) {
    res.json(error);
  }
};

export default {
  getAllStudents,
  getStudentByRoll,
  getStudentsByDept,
  getStudentProfile,
  dashboardFilter,
  paginatedDashboardFilter,
  cgpaGreater,
  getNotifStudents,
};
