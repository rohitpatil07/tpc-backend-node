import db from '../config/db.js';

const home = async () => {
  try {
    db.connect();
    const data = await db.promise().query('SELECT * FROM `students`');
    return data[0];
  } catch (error) {
    return error;
  }
};
export default { home };
