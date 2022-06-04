import eligibilityServices from '../services/eligibilityServices.js';

const getEligibleStudents = async (req, res) => {
  try {
    const students = await eligibilityServices.getEligibleStudents();
    console.log(students);
    return res.json({ students });
  } catch (error) {
    return res.json(error);
  }
};
const getSelectedStudentsCompanyWise = async (req, res) => {
  try {
    const students = await eligibilityServices.getSelectedStudentsCompanyWise();
    console.log(students);
    return res.json({ students });
  } catch (error) {
    return res.json(error);
  }
};
const getSelectedStudentsLpaWise = async (req, res) => {
  try {
    const students = await eligibilityServices.getSelectedStudentsLpaWise();
    console.log(students);
    return res.json({ students });
  } catch (error) {
    return res.json(error);
  }
}; 
export default { getEligibleStudents,getSelectedStudentsCompanyWise,getSelectedStudentsLpaWise };
