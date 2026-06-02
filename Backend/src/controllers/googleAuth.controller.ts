
import type { Request, Response } from "express";
import { googleSignIn } from "../services/googleAuth.service.js";
import { googleAuthSchema } from "../validators/googleAuth.validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
 
export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const parsed = googleAuthSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }
  const result = await googleSignIn(parsed.data);
  res.status(200).json(result);
});
