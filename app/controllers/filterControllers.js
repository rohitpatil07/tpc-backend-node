import filterService from '../services/filterservice.js';

const home = async (req, res) => {
  let data = await filterService.home();
  res.json({ result: data });
};

export default { home };
