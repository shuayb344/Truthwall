import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/User.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

interface JwtPayload {
  id: string;
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Not authorized, token missing", 401);
    }

    const token = authHeader.split(" ")[1] as string;
    const decoded = jwt.verify(token, JWT_SECRET!)as unknown as JwtPayload;
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new AppError("Not authorized, user not found", 401);
    }

    req.user = user;
    next();
 
});