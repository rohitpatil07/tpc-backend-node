import exceljs from 'exceljs';
import excelUtility from '../util/excelUtility.js';

const download = async (students) => {
  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('student_data');

    worksheet.columns = excelUtility.createWorksheetCols(students);

    students.forEach((student) => {
      worksheet.addRow(student);
    });

    await workbook.xlsx.writeFile('export.xlsx');

    return 'File Downloaded';
  } catch (error) {
    return error;
  }
};

export default { download };
