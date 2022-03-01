import db from '../config/db.js';

const getAllStudents = async () => {
  try {
    let table = 'students';
    db.connect();
    let query = 'SELECT * FROM ' + table;
    const data = await db.promise().query(query);
    return data[0];
  } catch (error) {
    return error;
  }
};

const getStudentByRoll = async (rollno) => {
  try {
    let student_roll = rollno;
    db.connect();
    let query = `SELECT * FROM students WHERE rollno='${student_roll}'`;
    const data = await db.promise().query(query);
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export default { getAllStudents, getStudentByRoll };
