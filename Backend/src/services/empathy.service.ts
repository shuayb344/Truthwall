import User from "../models/User.js";

export const incrementEmpathyScore = async (userId: string, point: number = 1) => {
  await User.findByIdAndUpdate(userId, { $inc: { empathyScore: point } });
}

export const decrementEmpathyScore = async (userId: string, point: number = 1) => {
  await User.findByIdAndUpdate(userId, { $inc: { empathyScore: -point } });
}