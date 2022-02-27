import logger from "../util/logger.js";
import config from "./index.js";

const connectDB = async () => {
  try {
    // const conn = await  (add connection function)
    // logger.info(`MySQL Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.log("error", "db: %O", err);
    process.exit(1);
  }
};

export default connectDB;
