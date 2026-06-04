import Post from "../models/Post.js";
import Reaction from "../models/Reaction.js";
import type { IUser } from "../models/User.js";
import type { ReactionInput } from "../validators/comment,validator.js";
import { AppError } from "../utils/appError.js";

export const toogleReaction = async (
  user: IUser,
  body: ReactionInput,
  postId: string
) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  if(!post.isPermanent && post.expiresAt < new Date() ) {
    throw new AppError("Post has expired", 400);
  }
  const { type } = body;
  const userId = user._id;
  const existingReaction = await Reaction.findOne({
    userId,
    postId
  });
  if (existingReaction) {
    if (existingReaction.type === type) {
      await existingReaction.deleteOne();
      await Post.findByIdAndUpdate(postId, {$inc: { [`reactionsCount.${existingReaction.type}`]: -1 }});
      return { message: "Reaction removed" ,
        type: existingReaction.type,
        reactionCounts: (await Post.findById(postId))?.reactionCounts
      };
    }

  } else {
    await Reaction.create({
      userId,
      postId,
      type
    });
    await Post.findByIdAndUpdate(postId, {$inc: { [`reactionsCount.${type}`]: 1 }});
    return { message: "Reaction added" ,
      type,
      reactionCounts: (await Post.findById(postId))?.reactionCounts
    };
  } 
}
