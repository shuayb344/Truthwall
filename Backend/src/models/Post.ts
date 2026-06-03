import mongoose, { Schema, Document } from "mongoose";
import { create } from "node:domain";
import { ca } from "zod/locales";

export interface IPost extends Document {
  content: string;
  image?: string;
  category: "mental-health" | "relationships" | "work" | "family" | "identity";
  authorId: mongoose.Types.ObjectId;
  authorAlias: string;
  reactionCounts: {
    feel_this: number;
    not_alone: number;
    stay_strong: number;
    sending_strength: number;
  };
  commentCount: number;
  expiresAt: Date;
  isPermanent: boolean;
  createdAt: Date;
}

const PostSchema= new Schema<IPost>(
  {
    content: { type: String, required: true, maxlength: 5000 , trim: true },
    image: { type: String , default: null },
    category: { type: String, enum: ["mental-health", "relationships", "work", "family", "identity"], required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorAlias: { type: String, required: true },
    reactionCounts: {
      feel_this: { type: Number, default: 0 },
      not_alone: { type: Number, default: 0 },
      stay_strong: { type: Number, default: 0 },
      sending_strength: { type: Number, default: 0 }
    },
    commentCount: { type: Number, default: 0 },
    expiresAt: { type: Date , default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)},
    isPermanent: { type: Boolean, default: false },
  },
  { timestamps:true }
);

PostSchema.index({category: 1, createdAt: -1 });
PostSchema.index({createdAt: -1 });
PostSchema.index({expiresAt: 1 });

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;