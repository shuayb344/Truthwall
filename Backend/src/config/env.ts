import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
export const {
  PORT,
  MONGO_URI,
  CLIENT_URL,
  JWT_EXPIRES_IN
} = process.env;

if (!process.env.JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}

export const JWT_SECRET = process.env.JWT_SECRET as string;
