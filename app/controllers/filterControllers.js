import filterService from "../services/filterservice.js";

const home = async (req, res) => {
  let message = filterService.home();
  res.json(message);
};

export default { home };
