import eligibilityServices from '../services/eligibilityServices.js';

const getTopPlacedStudents = async (req, res) => {
  try {
    const top10studentplaced = await eligibilityServices.getTopPlacedStudents();
    return res.json({ top10studentplaced });
  } catch (error) {
    return res.json(error);
  }
};
const getofferCount = async(req,res)=>{
  try{
    const offerCount = await eligibilityServices.getofferCount();
    return res.json({offerCount});
  }
  catch(error){
    return res.json(error);
  }
}
const getSelectedStudentsCompanyWise = async (req, res) => {
  try {
    const studentsPlacedCompanyWise = await eligibilityServices.getSelectedStudentsCompanyWise();
    return res.json({ studentsPlacedCompanyWise  });
  } catch (error) {
    return res.json(error);
  }
};
const getSelectedStudentsLpaWise = async (req, res) => {
  try {
    const studentsPlacedLpaWise  = await eligibilityServices.getSelectedStudentsLpaWise();
    return res.json({ studentsPlacedLpaWise  });
  } catch (error) {
    return res.json(error);
  }
}; 


const getCompanyWisePackage = async (req, res) => {
  try {
    const companyWisePackage =
      await eligibilityServices.getCompanyWisePackage();
    return res.json({ companyWisePackage });
  } catch (error) {
    res.json(error);
  }
};

export default { getofferCount,getTopPlacedStudents,getSelectedStudentsCompanyWise,getSelectedStudentsLpaWise ,getCompanyWisePackage};