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

const getStudentProfile = async (rollno) => {
  try {
    let data = await prisma.students.findUnique({
      where: {
        rollno: rollno,
      },
      include: {
        other_info: {
          select: {
            hobbies: true,
          },
        },
        academic_info: true,
        student_placement_details: true,
        student_experience: true,
        student_skillset: true,
      },
    });

    const student = bigIntParser(data);

    return student;
  } catch (error) {
    return error;
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

const getStudentsByCustom = async (h) =>{
  try{
    console.log(h)
    let students = await prisma.students.findMany({
      where: 
        h
      ,
    });

    for (let info in students) {
      console.log(students[info]);
      students[info] = bigIntParser(students[info]);
    }

    return students;
  } catch (error) {
    return error;
  }
}



export default {
  getAllStudents,
  getStudentByRoll,
  getStudentsByDept,
  getStudentProfile,
  getStudentsByCustom,
};
