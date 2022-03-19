import downloadCsvService from "../services/downloadCsvService.js";

const download = async (req, res) => {
  try {
    const { students } = req.body;
    await downloadCsvService.download(students);
    res.download('export.csv');
  } catch (error) {
    res.json(error);
  }
};

export default { download };
