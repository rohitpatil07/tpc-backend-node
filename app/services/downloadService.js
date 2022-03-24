import exceljs from 'exceljs';
import excelUtility from '../util/excelUtility.js';
import removeNestedObject from '../util/removeNestedObject.js';

const download = async (students) => {
  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('student_data');

    const allstudents = removeNestedObject(students);

    worksheet.columns = excelUtility.createWorksheetCols(allstudents[0]);

    allstudents.forEach((student) => {
      worksheet.addRow(student);
    });

    await workbook.xlsx.writeFile('export.xlsx');
  } catch (error) {
    return error;
  }
};

export default { download };
