import downloadService from '../services/downloadService.js';
import objectify from '../util/objectUtility.js';
import bigIntParser from '../util/bigintparser.js';
import filterService from '../services/filterservice.js';

const download = async (req, res) => {
  try {
    let data = req.body;
    let select_fields = await objectify(data);
    let where_queries = data.queries;
    let students = await filterService.dashboardFilter(
      where_queries,
      select_fields,
    );

    for (let info in data) {
      data[info] = bigIntParser(data[info]);
    }

    await downloadService.download(students);
    res.download('export.xlsx');
  } catch (error) {
    res.json(error);
  }
};

export default { download };
