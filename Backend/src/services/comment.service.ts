import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import { AppError } from "../utils/appError.js";
import  type { IUser }  from "../models/User.js";
import type { CreateCommentInput, CommentQueryInput } from "../validators/comment,validator.js";

export const createComment = async (user: IUser, postId: string, body: CreateCommentInput): Promise<unknown> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  if(!post.isPermanent && post.expiresAt < new Date())  {
    throw new AppError("Post has expired", 400);
  }
  const comment = await Comment.create({
    postId,
    authorId: user._id,
    authorAlias: user.alias,
    content: body.content,
  });
  await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });
  return comment;
}

export const getComments = async (postId: string, query: CommentQueryInput): Promise<unknown> => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
 
  const [comments, total] = await Promise.all([
    Comment.find({ postId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Comment.countDocuments({ postId }),
  ]);
 
  return {
    comments,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};
