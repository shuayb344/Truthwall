import Post from "../models/Post.js";
import { AppError } from "../utils/appError.js";
import type { CreatePostInput, FeedQueryInput } from "../validators/post.validator.js";
import type { IUser } from "../models/User.js";
import detectCrisis from "../utils/detectCrisis.js";
import Bookmark from "../models/Bookmark.js";

const buildTrendingPipeline = (filter: Record<string, any>, skip: number, limit: number) => {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return Post.aggregate([
    { $match: filter },
    {
      $addFields: {
        trendingScore: {
          $add: [
            "$reactionCounts.feel_this",
            "$reactionCounts.not_alone",
            "$reactionCounts.stay_strong",
            "$reactionCounts.sending_strength",
            { $cond: [{ $gte: ["$createdAt", last24Hours] }, 10, 0] }
          ]
        }
      }
    },
    { $sort: { trendingScore: -1, createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  ])
}

export const createPost = async (body: CreatePostInput, user: IUser) => {
  const crisisResult = detectCrisis(body.content);
  const post = await Post.create({
    content: body.content,
    category: body.category,
    isPermanent: body.isPermanent || crisisResult.crisis,
    authorId: user._id,
    authorAlias: user.alias,
    image: body.image ?? "",
    crisis: {
      flagged: crisisResult.crisis,
      severity: crisisResult.severity
    }
  });
  return post;
};

export const getFeed = async (query: FeedQueryInput, user?: IUser) => {
  const category = query.category;
  const sort = query.sort ?? "latest";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter: Record<string, any> = {
    $or: [
      { expiresAt: { $gt: new Date() } },
      { isPermanent: true }
    ]
  }
  if (category) {
    filter.category = category;
  }
  const total = await Post.countDocuments(filter);

  let posts;
  if (sort === "trending") {
    posts = await buildTrendingPipeline(filter, skip, limit);
  } else {
    posts = await Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  }

  // Add bookmark info if user is provided
  if (user && posts.length > 0) {
    const postIds = posts.map((p: any) => p._id);
    const bookmarks = await Bookmark.find({
      userId: user._id,
      postId: { $in: postIds }
    }).select("postId");
    const bookmarkedSet = new Set(bookmarks.map((b) => b.postId.toString()));

    posts = posts.map((p: any) => ({
      ...p,
      isBookmarked: bookmarkedSet.has(p._id.toString())
    }));
  } else {
    posts = posts.map((p: any) => ({
      ...p,
      isBookmarked: false
    }));
  }

  return { posts, pagination: { page, limit, total, totalPages: Math.ceil(total / limit), hasNextPage: page < Math.ceil(total / limit), hasPrevPage: page > 1 } };
};

export const getPostById = async (postId: string, user?: IUser) => {
  const post = await Post.findById(postId).lean();
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  if (post.expiresAt < new Date() && !post.isPermanent) {
    throw new AppError("Post has expired", 410);
  }

  let isBookmarked = false;
  if (user) {
    const bookmark = await Bookmark.findOne({ userId: user._id, postId });
    isBookmarked = !!bookmark;
  }

  return { ...post, isBookmarked };
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
  await Post.findByIdAndDelete(postId);

  return { message: "Post deleted successfully" };
};