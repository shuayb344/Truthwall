import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import {
  getProfileStats,
  getUserPosts,
  getUserBookmarks,
} from "../services/profile.service.js";

export const getProfileHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authorized", 401);
  const result = await getProfileStats(req.user);
  res.status(200).json(result);
});

export const getUserPostsHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authorized", 401);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await getUserPosts(req.user, page, limit);
  res.status(200).json(result);
});

export const getUserBookmarksHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authorized", 401);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await getUserBookmarks(req.user, page, limit);
  res.status(200).json(result);
});
