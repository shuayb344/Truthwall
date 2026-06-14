import mongoose, { Schema, Document } from "mongoose";

export interface ICommentLike extends Document {
  commentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CommentLikeSchema = new Schema<ICommentLike>(
  {
    commentId: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

CommentLikeSchema.index({ commentId: 1, userId: 1 }, { unique: true });

const CommentLike = mongoose.model<ICommentLike>("CommentLike", CommentLikeSchema);

export default CommentLike;
