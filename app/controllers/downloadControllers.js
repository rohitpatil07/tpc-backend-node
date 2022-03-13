import downloadService from '../services/downloadService.js';

const download = async (req, res) => {
  try {
    const { students } = req.body;
    await downloadService.download(students);
    res.download('export.xlsx');
  } catch (error) {
    res.json(error);
  }
};

export default { download };
