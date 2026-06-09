import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError.js";
const adminOnly = (req: Request, _res: Response, next: NextFunction): void => {
  if (!req.user) {
    throw new AppError("Not authorized", 401);
  }
  if (req.user.role !== "admin") {
    throw new AppError("Admin access required", 403);
  }
  next();
};
 
export default adminOnly;
