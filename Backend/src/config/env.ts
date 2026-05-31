import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
export const {
  PORT,
  MONGO_URI,
  CLIENT_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN
} = process.env;