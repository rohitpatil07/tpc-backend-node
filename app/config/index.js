import dotenv from 'dotenv';

dotenv.config();

export default {
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
};
