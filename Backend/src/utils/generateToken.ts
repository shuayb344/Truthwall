import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
export const generateToken = (userId : string) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
  return token;
}