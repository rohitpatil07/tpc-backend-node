const createWorksheetCols = (student_data) => {
  let columns = [];
  for (let info in student_data) {
    columns.push(info);
  }

  let worksheet_cols = [];

  columns.forEach((column) => {
    let colwidth = 14;
    if (column == 'email' || column == 'rait_email') {
      colwidth = 30;
    }

    const header = {
      header: column,
      key: column,
      width: colwidth,
    };

    worksheet_cols.push(header);
  });

  return worksheet_cols;
};

export default { createWorksheetCols };
