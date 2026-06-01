import User from "../models/User.js";
import bcrypt from "bcryptjs";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";
import { generateToken } from "../utils/generateToken.js";
import { AppError } from "../utils/appError.js";

const safeUser = (user: any) => {
  return {
    email: user.email,
    alias: user.alias,
    avatarUrl: user.avatarUrl,
    empathyScore: user.empathyScore,
  }
}

export const register = async ({ email, password }: RegisterInput) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  const token = generateToken(newUser._id.toString());
  return { message: "User registered successfully", token, user: safeUser(newUser) };
}

export const login = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user._id.toString());
  return { token, user: safeUser(user) };
}
