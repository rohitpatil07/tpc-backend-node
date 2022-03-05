import prisma from '../config/prisma.js';

const getAllStudents = async () => {
  try {
    const students = await prisma.students.findMany();
    return students;
  } catch (error) {
    return error;
  }
};

const getStudentByRoll = async (rollno) => {
  try {
    const student = await prisma.students.findUnique({
      where: {
        rollno: rollno,
      },
      select: {
        name: true,
        rollno: true,
        dept: true,
      },
    });
    return student;
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
