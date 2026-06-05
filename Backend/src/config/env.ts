import dotenv from 'dotenv';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

export const PORT = process.env.PORT || "5000";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const MONGO_URI = requireEnv("MONGO_URI");
export const JWT_SECRET = requireEnv("JWT_SECRET");
export const FIREBASE_PROJECT_ID = requireEnv("FIREBASE_PROJECT_ID");
export const FIREBASE_CLIENT_EMAIL = requireEnv("FIREBASE_CLIENT_EMAIL");
export const FIREBASE_PRIVATE_KEY = requireEnv("FIREBASE_PRIVATE_KEY");
export const CLOUDINARY_CLOUD_NAME = requireEnv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = requireEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = requireEnv("CLOUDINARY_API_SECRET");
export const OPENAI_API_KEY = requireEnv("OPENAI_API_KEY");