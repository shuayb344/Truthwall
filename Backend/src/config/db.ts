import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";
import logger from "../utils/logger.js";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI!);
    logger.info("MongoDB connected successfully");
  
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
}

export default connectDB;