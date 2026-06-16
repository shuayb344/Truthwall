import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import CommentLike from "../models/CommentLike.js";
import { AppError } from "../utils/appError.js";
import type { IUser } from "../models/User.js";
import type { CreateCommentInput, CommentQueryInput } from "../validators/comment.validator.js";
import { createNotification } from "./notification.service.js";

export const createComment = async (user: IUser, postId: string, body: CreateCommentInput): Promise<unknown> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  if (!post.isPermanent && post.expiresAt < new Date()) {
    throw new AppError("Post has expired", 400);
  }


  let parentComment = null;
  if (body.parentId) {
    parentComment = await Comment.findById(body.parentId);
    if (!parentComment || parentComment.postId.toString() !== postId) {
      throw new AppError("Parent comment not found", 404);
    }
  }

  const comment = await Comment.create({
    postId,
    authorId: user._id,
    authorAlias: user.alias,
    content: body.content,
    parentId: body.parentId || null,
  });

  await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });


  const isPostOwner = post.authorId.toString() === user._id.toString();
  if (!isPostOwner) {
    await createNotification({
      userId: post.authorId.toString(),
      message: `${user.alias} commented on your post`,
      type: "comment",
      postId
    });
  }

  if (parentComment) {
    const isParentAuthor = parentComment.authorId.toString() === user._id.toString();
    const isParentPostOwner = parentComment.authorId.toString() === post.authorId.toString();


    if (!isParentAuthor && !isParentPostOwner) {
      await createNotification({
        userId: parentComment.authorId.toString(),
        message: `${user.alias} replied to your comment`,
        type: "comment",
        postId
      });
    }
  }

  return comment;
}

export const getComments = async (postId: string, query: CommentQueryInput, user?: IUser): Promise<unknown> => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const [comments, total] = await Promise.all([
    Comment.find({ postId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Comment.countDocuments({ postId }),
  ]);

  let processedComments: any[] = comments;
  if (user) {
    const commentIds = comments.map(c => c._id);
    const userLikes = await CommentLike.find({
      userId: user._id,
      commentId: { $in: commentIds }
    }).select("commentId");
    const likedCommentIds = new Set(userLikes.map(l => l.commentId.toString()));

    processedComments = comments.map(c => ({
      ...c,
      isLiked: likedCommentIds.has(c._id.toString())
    }));
  }

  return {
    comments: processedComments,
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

export const toggleCommentLike = async (user: IUser, commentId: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new AppError("Comment not found", 404);

  const existingLike = await CommentLike.findOne({
    userId: user._id,
    commentId
  });

  if (existingLike) {
    await existingLike.deleteOne();
    await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: -1 } });
    return { liked: false, likesCount: comment.likesCount - 1 };
  } else {
    await CommentLike.create({
      userId: user._id,
      commentId
    });
    await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: 1 } });

    // Notify commenter
    const isOwner = comment.authorId.toString() === user._id.toString();
    if (!isOwner) {
      await createNotification({
        userId: comment.authorId.toString(),
        message: `${user.alias} liked your response 🤍`,
        type: "reaction",
        postId: comment.postId.toString()
      });
    }

    return { liked: true, likesCount: comment.likesCount + 1 };

  }
};

