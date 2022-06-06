import downloadZipService from '../services/downloadZipService.js';

const download = async (req, res) => {
  try {
    const students = req.body.data;
    await downloadZipService.download(students);
    //res.download('export.zip');
    return res.status(200).json({ message: 'Sucess' });
  } catch (error) {
    res.json(error);
  }
};

export default { download };
