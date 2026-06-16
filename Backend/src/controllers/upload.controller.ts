import type { Request, Response } from "express";
import {asyncHandler }from "../utils/asyncHandler.js";
import { uploadImage } from "../services/upload.service.js";
import { AppError } from "../utils/appError.js";
import 'multer';
export const uploadImageHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authorized", 401);
  if (!req.file) throw new AppError("No image file provided", 400);
 
  const result = await uploadImage(req.file);
  res.status(200).json(result);
});
