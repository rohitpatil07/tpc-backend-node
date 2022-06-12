import companyService from '../services/companyService.js';
import eligibilityServices from '../services/eligibilityServices.js';
import downloadService from '../services/downloadService.js';

const lookup = async (req, res) => {
    try {
      const Companies = await companyService.getCompany();
    return res.json({ Companies});
    }
    catch (error) {
        res.json(error);
      }
};

const download = async (req, res) => {
  try {
    const Companies = await companyService.getCompany();
    console.log(Companies);
    await downloadService.download(Companies);
    res.download('export.xlsx');
  }
  catch (error) {
    res.json(error);
  }
};

export default { lookup, download };