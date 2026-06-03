
import type { Request, Response } from "express";
import { googleSignIn } from "../services/googleAuth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
 
export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const result = await googleSignIn(req.body);
  res.status(200).json(result);
});
