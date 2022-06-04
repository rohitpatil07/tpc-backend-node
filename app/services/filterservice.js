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

const dashboardFilter = async (where_queries, select_fields) => {
  try {
    let data = await prisma.students.findMany({
      where: where_queries,
      select: select_fields,
    });
    for (let info in data) {
      console.log(data[info]);
      data[info] = bigIntParser(data[info]);
    }
    const student = data;
    return student;
  } catch (error) {
    return error;
  }
};

const cgpaGreater = async (data) => {
  try {
    let eligible = await prisma.academic_info.findMany({
      where: {
        cgpa: { gte: data },
      },
      
      include:{
        students:{
          select:{
            department:true,
            first_name:true,
            middle_name:true,
            last_name:true,
            email:true,
            phone_number:true,
            department:true,
          }
        },
      }  
      // include: {
      //   students: true,
      //   student_experience: true,
      //   student_skillset: true,
      // },
    });
    for (let info in eligible) {
      console.log(eligible[info]);
      eligible[info].students = bigIntParser(eligible[info].students);
    }
    const student = eligible;
    return student;
  } catch (error) {
    return error;
  }
};

export default {
  getAllStudents,
  getStudentByRoll,
  getStudentsByDept,
  getStudentProfile,
  dashboardFilter,
  cgpaGreater,
};
