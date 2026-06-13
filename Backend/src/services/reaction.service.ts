import Post from "../models/Post.js";
import Reaction from "../models/Reaction.js";
import type { IUser } from "../models/User.js";
import type { ReactionInput } from "../validators/comment,validator.js";
import { AppError } from "../utils/appError.js";
import { createNotification } from "./notification.service.js";
import { decrementEmpathyScore , incrementEmpathyScore } from "./empathy.service.js";


const reactionMessages: Record<string, string> = {
  feel_this: "Someone felt your truth 🤝",
  not_alone: "Someone reminded you — you're not alone 💙",
  stay_strong: "Someone told you to stay strong 💪",
  sending_strength: "Someone is sending you strength ✨",
};

export const toggleReaction = async (
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
   const isOwner = post.authorId.toString() === user._id.toString();
  const existingReaction = await Reaction.findOne({
    userId,
    postId
  });
  if (existingReaction) {
    if (existingReaction.type === type) {
      await existingReaction.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $inc: { [`reactionCounts.${existingReaction.type}`]: -1 },
      });
      if (!isOwner) {
        await decrementEmpathyScore(post.authorId.toString());
      }

      return {
        message: "Reaction removed",
        type: existingReaction.type,
        reactionCounts: (await Post.findById(postId))?.reactionCounts,
      };
    } else {
      // Switch reaction type
      const oldType = existingReaction.type;
      existingReaction.type = type;
      await existingReaction.save();

      await Post.findByIdAndUpdate(postId, {
        $inc: {
          [`reactionCounts.${oldType}`]: -1,
          [`reactionCounts.${type}`]: 1,
        },
      });

      return {
        message: "Reaction updated",
        type,
        reactionCounts: (await Post.findById(postId))?.reactionCounts,
      };
    }
  } else {
    await Reaction.create({
      userId,
      postId,
      type
    });
    await Post.findByIdAndUpdate(postId, { $inc: { [`reactionCounts.${type}`]: 1 } });
    if (!isOwner) {
      await incrementEmpathyScore(post.authorId.toString());
      await createNotification({
        userId: post.authorId.toString(),
        message: reactionMessages[type] ?? `${user.alias} reacted to your post`,
        type: "reaction",
        postId,
      });
    }
    return {
      message: "Reaction added",
      type,
      reactionCounts: (await Post.findById(postId))?.reactionCounts,
    };
  }
};

