import prisma from '../config/prisma.js';
import bigIntParser from '../util/bigintparser.js';

const getAllStudents = async () => {
  try {
    let students = await prisma.students.findMany();
    for (let info in students) {
      students[info] = bigIntParser(students[info]);
    }
    return students;
  } catch (error) {
    return error;
  }
};

const getStudentByRoll = async (roll_no) => {
  try {
    let data = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
    });

    const student = bigIntParser(data);

    return student;
  } catch (error) {
    return error;
  }
};

const getStudentProfile = async (roll_no) => {
  try {
    let data = await prisma.students.findUnique({
      where: {
        roll_no: roll_no,
      },
      include: {
        other_info: true,
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
      data[info] = bigIntParser(data[info]);
    }
    const student = data;
    console.log(data);
    return student;
  } catch (error) {
    return error;
  }
};

const paginatedDashboardFilter = async (
  where_queries,
  select_fields,
  page,
  limit,
) => {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    console.log(typeof page);
    console.log(typeof limit);

    console.log(startIndex, endIndex);

    const students = await prisma.students.findMany({
      where: where_queries,
      select: select_fields,
      skip: startIndex,
      take: endIndex - startIndex,
    });

    for (let info in students) {
      students[info] = bigIntParser(students[info]);
    }

    let results = {};
    results['students'] = students;

    if (page == 1) {
      results['previous'] = 1;
    } else {
      results['previous'] = page - 1;
    }

    if (results.students.length < 1) {
      results['next'] = 2;

      const students = await prisma.students.findMany({
        where: where_queries,
        select: select_fields,
        skip: 0,
        take: limit,
      });

      for (let info in students) {
        students[info] = bigIntParser(students[info]);
      }

      results['students'] = students;
    } else if (results.students.length < limit) {
      results['next'] = 1;
    } else {
      results['next'] = page + 1;
    }

    return results;
  } catch (error) {
    return error;
  }
};

const cgpaGreater = async (hello) => {
  try {
    let eligible = await prisma.academic_info.findMany({
      where: hello,

      include: {
        students: {
          select: {
            department: true,
            first_name: true,
            middle_name: true,
            last_name: true,
            email: true,
            phone_number: true,
          },
        },
      },
    });
    for (let info in eligible) {
      eligible[info].students = bigIntParser(eligible[info].students);
    }
    const student = eligible;
    return student;
  } catch (error) {
    return error;
  }
};

const getNotifStudents = async (criteria) => {
  try {
    let students = [];
    let eligible = await prisma.academic_info.findMany({
      select: {
        roll_no: true,
      },
      where: {
        deadkt: { lte: criteria.deadkt },
        livekt: { lte: criteria.livekt },
        gap: { lte: criteria.gap },
        be_percent: { gte: criteria.be_percent },
        cgpa: { gte: criteria.cgpa },
        twelveth_percent: { gte: criteria.twelveth_percent },
        tenth_percent: { gte: criteria.tenth_percent },
      },
    });

    for (let student in eligible) {
      students.push(eligible[student]['roll_no']);
    }

    eligible = await prisma.students.findMany({
      select: {
        roll_no: true,
      },
      where: {
        roll_no: { in: students },
        no_of_offers: { lte: 1 },
      },
    });

    students = [];
    for (let student in eligible) {
      students.push(eligible[student]['roll_no']);
    }

    const limit = criteria.package - 150000 + 1;

    eligible = await prisma.student_placement_details.findMany({
      select: {
        roll_no: true,
      },
      where: {
        roll_no: { in: students },
        package_one: { lt: limit },
        package_two: { lt: limit },
        package_three: { lt: limit },
      },
    });

    students = [];

    for (let student in eligible) {
      students.push(eligible[student]['roll_no']);
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
  getStudentProfile,
  dashboardFilter,
  cgpaGreater,
  getNotifStudents,
  paginatedDashboardFilter,
};
