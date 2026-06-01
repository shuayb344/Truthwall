import type { Request, Response } from "express";
import { register, login } from "../services/auth.service.js";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await register({ email, password });
    res.status(201).json(result);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.status(200).json(result);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
} 