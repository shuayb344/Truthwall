import User from "../models/User.js";
import Post from "../models/Post.js";
import Report from "../models/Report.js";
import Comment from "../models/Comment.js";
import { AppError } from "../utils/appError.js";

export const getReports = async () => {
  const reports = await Report.find({ resolved: false })
    .sort({ createdAt: -1 })
    .populate("postId")
    .populate("reportedById", "alias email");

  return reports;
};

export const resolveReport = async (reportId: string) => {
  const report = await Report.findById(reportId);
  if (!report) throw new AppError("Report not found", 404);

  report.resolved = true;
  await report.save();

  return { message: "Report resolved successfully" };
};

export const removePost = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) throw new AppError("Post not found", 404);

  await post.deleteOne();
  await Report.updateMany({ postId }, { resolved: true });

  return { message: "Post removed successfully" };
};

export const getUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 }).select("-password");
  return users;
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

export const getStats = async () => {
  const [userCount, postCount, pendingReports, commentCount] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
    Report.countDocuments({ resolved: false }),
    Comment.countDocuments(),
  ]);

  return {
    users: userCount,
    posts: postCount,
    reports: pendingReports,
    comments: commentCount,
  };
};

