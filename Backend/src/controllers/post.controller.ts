import type { Request, Response } from "express";
import { createPost , getFeed , getPostById , deletePost} from "../services/post.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPostController = asyncHandler(async (req: Request, res: Response) => {
  const post = await createPost(req.body, req.user!);
  res.status(201).json(post);
});

export const getFeedController = asyncHandler(async (req: Request, res: Response) => {
  const feed = await getFeed(req.query as any );
  res.status(200).json(feed);
});

export const getPostByIdController = asyncHandler(async (req: Request, res: Response) => {
  const post = await getPostById(req.params.id as string);
  res.status(200).json(post);
});

export const deletePostController = asyncHandler(async (req: Request, res: Response) => {
  const result = await deletePost(req.params.id as string, req.user!);
  res.status(200).json(result);
});