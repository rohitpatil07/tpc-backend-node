import downloadService from '../services/download.js';

const download = async (req, res) => {
  try {
    const { students } = req.body;
    const message = await downloadService.download(students);
    res.json({ message: message });
  } catch (error) {
    res.json(error);
  }
};

export default { download };
