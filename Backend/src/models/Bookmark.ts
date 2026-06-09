import mongoose, { Schema, Document } from "mongoose";

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }
  },
  { timestamps:true }
);

BookmarkSchema.index({ userId: 1, postId: 1 }, { unique: true });
BookmarkSchema.index({ userId: 1 , createdAt: -1 });

const Bookmark = mongoose.model<IBookmark>("Bookmark", BookmarkSchema);

export default Bookmark;