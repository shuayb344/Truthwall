import type { Request, Response } from "express";
import { toggleBookmark, getBookmarks } from "../services/bookmark.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";

export const toggleBookmarkHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }
  const result = await toggleBookmark(req.user, req.params.postId as string);
  res.status(200).json(result);
});

export const getBookmarksHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }
  const bookmarks = await getBookmarks(req.user);
  res.status(200).json(bookmarks);
});