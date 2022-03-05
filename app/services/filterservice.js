import prisma from '../config/prisma.js';

const getAllStudents = async () => {
  try {
    const students = await prisma.students.findMany();
    return students[0];
  } catch (error) {
    return error;
  }
};

const getStudentByRoll = async (rollno) => {
  try {
    const students = await prisma.students.findMany({
      where: {
        rollno: rollno,
      },
    });
    return students[0];
  } catch (error) {
    console.log(error);
  }
};

const getStudentsByDept = async (dept) => {
  try {
    const students = await prisma.students.findMany({
      where: {
        dept: dept,
      },
    });
    return students[0];
  } catch (error) {
    return error;
  }
};

export default {
  getAllStudents,
  getStudentByRoll,
  getStudentsByDept,
};
