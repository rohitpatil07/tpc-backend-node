const removeNestedObject = (students) => {
  let allstudents = [];

  students.forEach((student) => {
    let student_data = {};
    for (const col in student) {
      if (isObject(student[col]) == true) {
        for (const attr in student[col]) {
          student_data[attr] = student[col][attr];
        }
      } else {
        student_data[col] = student[col];
      }
    }

    allstudents.push(student_data);
  });

  return allstudents;
};
const isObject = function (a) {
  return !!a && a.constructor === Object;
};

export default removeNestedObject;
