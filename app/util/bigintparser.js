import jsonBigint from 'json-bigint';

const bigIntParser = (student) => {
  Object.keys(student).map((key) => {
    if (typeof student[key] == 'bigint') {
      student[key] = jsonBigint.parse(student[key]);
    }
  });
  return student;
};

export default bigIntParser;
