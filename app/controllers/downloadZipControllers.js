import downloadZipService from '../services/downloadZipService.js';

const zipDownload = async (req, res) => {
  try {
    const students = req.body.data;
    await downloadZipService.zipDownload(students);
    setTimeout(()=>{
    res.download('export.zip');
    },1500);
  } catch (error) {
    res.json(error);
  }
};

const resumeDownload = async (req, res) => {
  try {
    const rollno = req.body.data;
    await downloadZipService.resumeDownload(rollno);
    setTimeout(()=>{
      res.download('resume.pdf');
    },500);
  } catch (error) {
    res.json(error);
  }
};

export default { resumeDownload, zipDownload };