import  User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";
import { generateToken } from "../utils/generateToken.js";


const safeUser = (user : any) => {
  return {
    email: user.email,
    alias: user.alias,
    avatarUrl: user.avatarUrl,
    empathyScore: user.empathyScore,
  }
}
export const register = async ({ email, password }: RegisterInput) => {
  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = generateToken(newUser._id.toString());
    return { message: "User registered successfully", token, user: safeUser(newUser) };
  } catch (error) {
    throw new Error("Internal server error");
  }
}

export const login = async ({ email, password }: LoginInput) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return { token, user: safeUser(user) };
  } catch (error) {
    throw new Error("Internal server error");
  }
}
