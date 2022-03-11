import prisma from '../config/prisma.js';
import bigIntParser from '../util/bigintparser.js';

const getAllStudents = async () => {
  try {
    let students = await prisma.students.findMany();
    for (let info in students) {
      console.log(students[info]);
      students[info] = bigIntParser(students[info]);
    }
    return students;
  } catch (error) {
    return error;
  }
};

const getStudentByRoll = async (rollno) => {
  try {
    let data = await prisma.students.findUnique({
      where: {
        rollno: rollno,
      },
    });

    const student = bigIntParser(data);

    return student;
  } catch (error) {
    console.log(error);
  }
};

const getStudentsByDept = async (department) => {
  try {
    let students = await prisma.students.findMany({
      where: {
        department: department,
      },
    });

    for (let info in students) {
      console.log(students[info]);
      students[info] = bigIntParser(students[info]);
    }

    return students;
  } catch (error) {
    return error;
  }
};

export default {
  getAllStudents,
  getStudentByRoll,
  getStudentsByDept,
};
