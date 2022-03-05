import db from '../config/db.js';

const getAllStudents = async () => {
  try {
    let table = 'students';
    db.connect();
    let query = 'SELECT * FROM ' + table;
    const students = await db.promise().query(query);
    return students[0];
  } catch (error) {
    return error;
  }
};

const getStudentByRoll = async (rollno) => {
  try {
    let student_roll = rollno;
    db.connect();
    let query = `SELECT * FROM students WHERE rollno='${student_roll}'`;
    const students = await db.promise().query(query);
    return students[0];
  } catch (error) {
    console.log(error);
  }
};

const getStudentsByDept = async (dept) => {
  try {
    db.connect();
    let query = `SELECT * FROM students WHERE dept='${dept}'`;
    const students = await db.promise().query(query);
    return students[0];
  } catch (error) {
    return error;
  }
};

export default { getAllStudents, getStudentByRoll, getStudentsByDept };
