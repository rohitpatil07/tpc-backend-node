import prisma from '../config/prisma.js';

const getEligibleStudents = async () => {
  try {
    let students = await prisma.student_placement_details.findMany({});
    return students;
  } catch (error) {
    return error;
  }
};

export default { getEligibleStudents };
