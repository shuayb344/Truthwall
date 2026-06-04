import type { Request, Response } from 'express';
import { toogleReaction } from '../services/reaction.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {createComment, getComments} from '../services/comment.service.js';


export const createCommentHandler = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.id as string;
  const comment = await createComment(req.user!, postId, req.body);
  res.status(201).json({ success: true, data: comment });
});

export const getCommentsHandler = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.id as string;
  const commentsData = await getComments(postId, req.query as any);
  res.status(200).json({ success: true, data: commentsData });
});
export const toggleReactionHandler = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.id as string;
  const result = await toogleReaction(req.user!, req.body, postId);
  res.status(200).json({ success: true, data: result });
});