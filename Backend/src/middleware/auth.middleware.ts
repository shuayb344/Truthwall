import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/User.js";
import { AppError } from "../utils/appError.js";

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  try{
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
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    // Handles jwt.verify failures (expired, invalid signature, etc.)
    res.status(401).json({ error: "Invalid or expired token" });
  }
}