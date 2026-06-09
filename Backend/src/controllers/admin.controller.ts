import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getReports, removePost, banUser, unbanUser } from "../services/admin.service.js";
 
export const getReportsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const reports = await getReports();
  res.status(200).json(reports);
});
 
export const removePostHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await removePost(req.params.id as string);
  res.status(200).json(result);
});
 
export const banUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await banUser(req.params.id as string);
  res.status(200).json(result);
});
 
export const unbanUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const result = await unbanUser(req.params.id as string);
  res.status(200).json(result);
});
