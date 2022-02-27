import dotenv from 'dotenv';

dotenv.config();

export default {
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASS: process.env.DB_PASS,
};
