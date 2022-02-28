import logger from '../util/logger.js';
import config from './index.js';
import mysql2 from 'mysql2';

const connectDB = () => {
  try {
    const db = mysql2.createConnection(config.DATABASE_URL);
    return db;
  } catch (error) {
    logger.log('error', 'db: %O', error);
  }
};

const db = connectDB();

export default db;
