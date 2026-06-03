import Post from "../models/Post.js";
import { AppError } from "../utils/appError.js";
import type { CreatePostInput , FeedQueryInput } from "../validators/post.validator.js";
import type { IUser } from "../models/User.js";

export const createPost = async (body: CreatePostInput, user: IUser) => {
  const post = await Post.create({
    content: body.content,
    category: body.category,
    isPermanent: body.isPermanent,
    authorId: user._id,
    authorAlias: user.alias,
  });
  return post;
};

export const getFeed = async (query: FeedQueryInput) => {
  const { category, page , limit  } = query;
  const skip = (page - 1) * limit;
  const filter : Record<string, any> = {
    $or:[
      { expiresAt: { $gt: new Date() } },
      { isPermanent: true }
    ]
  }   
  if(category){
    filter.category = category;
  }
  const [posts, total] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Post.countDocuments(filter)
  ]);

  return { posts, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

export const getPostById = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  if(post.expiresAt < new Date() && !post.isPermanent){
    throw new AppError("Post has expired", 410);
  }
  return post;
};

export const deletePost = async (postId: string, user: IUser) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  const isAuthor = post.authorId.equals(user._id);
  const isAdmin = user.role === "admin";
  if (!isAuthor && !isAdmin) {
    throw new AppError("Unauthorized", 403);
  }
  await post.deleteOne();

  return{ message: "Post deleted successfully" };
};