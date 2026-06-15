import Post from "../models/Post.js";
import Bookmark from "../models/Bookmark.js";
import Reaction from "../models/Reaction.js";
import type { IUser } from "../models/User.js";

export const getProfileStats = async (user: IUser) => {
  const userId = user._id;

  const [postCount, bookmarkCount, totalReactions] = await Promise.all([
    Post.countDocuments({ authorId: userId }),
    Bookmark.countDocuments({ userId }),
    Reaction.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "post",
        },
      },
      { $unwind: "$post" },
      { $match: { "post.authorId": userId } },
      { $count: "total" },
    ]).then((result) => result[0]?.total || 0),
  ]);

  return {
    user: {
      id: user._id,
      alias: user.alias,
      avatarUrl: user.avatarUrl,
      empathyScore: user.empathyScore,
      createdAt: user.createdAt,
    },
    stats: {
      posts: postCount,
      reactions: totalReactions,
      bookmarks: bookmarkCount,
    },
  };
};

export const getUserPosts = async (user: IUser, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find({ authorId: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Post.countDocuments({ authorId: user._id }),
  ]);

  // Add bookmark info
  if (posts.length > 0) {
    const postIds = posts.map((p) => p._id);
    const bookmarks = await Bookmark.find({
      userId: user._id,
      postId: { $in: postIds },
    }).select("postId");
    const bookmarkedSet = new Set(bookmarks.map((b) => b.postId.toString()));

    const postsWithBookmarks = posts.map((p: any) => ({
      ...p,
      isBookmarked: bookmarkedSet.has(p._id.toString()),
    }));

    return {
      posts: postsWithBookmarks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  return {
    posts: posts.map((p: any) => ({ ...p, isBookmarked: false })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

export const getUserBookmarks = async (user: IUser, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [bookmarks, total] = await Promise.all([
    Bookmark.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("postId"),
    Bookmark.countDocuments({ userId: user._id }),
  ]);

  const posts = bookmarks
    .filter((b) => b.postId !== null)
    .map((b: any) => ({
      ...b.postId.toObject(),
      isBookmarked: true,
    }));

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};
