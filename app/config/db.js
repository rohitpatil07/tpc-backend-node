import logger from '../util/logger.js';
import config from './index.js';
import mysql from 'mysql';

const connectDB = async () => {
  try {
    const conn = await mysql.createConnection({
      host: config.DB_HOST,
      database: config.DB_NAME,
      user: config.DB_USER,
      password: config.DB_PASS,
    });
    logger.info(`MySQL Connected: ${conn.config.host}`);
  } catch (err) {
    logger.log('error', 'db: %O', err);
    process.exit(1);
  }
};

export default connectDB;
