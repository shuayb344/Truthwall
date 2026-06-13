import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { toggleReaction } from "../services/reaction.service.js";

export const toggleReactionController = asyncHandler(async (req: Request, res: Response) => {
  const result = await toggleReaction(req.user!, req.body, req.params.id as string);
  res.status(200).json(result);
});
