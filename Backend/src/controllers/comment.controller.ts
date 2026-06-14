import type { Request, Response } from 'express';
import { toggleReaction } from '../services/reaction.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createComment, getComments, toggleCommentLike } from '../services/comment.service.js';

export const createCommentHandler = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.id as string;
  const comment = await createComment(req.user!, postId, req.body);
  res.status(201).json({ success: true, data: comment });
});

export const getCommentsHandler = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.id as string;
  const commentsData = await getComments(postId, req.query as any, req.user);
  res.status(200).json({ success: true, data: commentsData });
});

export const toggleReactionHandler = asyncHandler(async (req: Request, res: Response) => {
  const postId = req.params.id as string;
  const result = await toggleReaction(req.user!, req.body, postId);
  res.status(200).json(result);
});

export const toggleCommentLikeHandler = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await toggleCommentLike(req.user!, commentId as string);
  res.status(200).json(result);
});