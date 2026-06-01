import type { Request, Response } from "express";
import { register, login } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await register({ email, password });
  res.status(201).json(result);
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await login({ email, password });
  res.status(200).json(result);
});
 