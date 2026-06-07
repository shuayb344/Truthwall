import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
} from "../services/notification.service.js";
import { AppError }from "../utils/appError.js";
 
export const getNotificationsHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authorized", 401);
  const result = await getUserNotifications(req.user._id.toString());
  res.status(200).json(result);
});
 
export const markAsReadHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authorized", 401);
  const notification = await markAsRead(req.params.id as string, req.user._id.toString());
  res.status(200).json(notification);
});
 
export const markAllAsReadHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Not authorized", 401);
  const result = await markAllAsRead(req.user._id.toString());
  res.status(200).json(result);
});
