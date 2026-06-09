import  User from "../models/User.js";
import Post from "../models/Post.js";
import Report from "../models/Report.js";
import { AppError } from "../utils/appError.js";

export const getReports = async () => {
  const reports = await Report.find({ resolved: false })
    .sort({ createdAt: -1 })
    .populate("postId")
    .populate("reportedBy", "alias email");
 
  return reports;
};

export const removePost = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new AppError("Post not found", 404);
 
  await post.deleteOne();
  await Report.updateMany({ postId }, { resolved: true });
 
  return { message: "Post removed successfully" };
};
 

export const banUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);
  if (user.role === "admin") throw new AppError("Cannot ban an admin", 403);
 
  user.isBanned = true;
  await user.save();
 
  return { message: `User ${user.alias} has been banned` };
};
 
export const unbanUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);
 
  user.isBanned = false;
  await user.save();
 
  return { message: `User ${user.alias} has been unbanned` };
};
