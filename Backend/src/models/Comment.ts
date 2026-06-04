import mongoose ,{ Schema , Document } from "mongoose";
interface IComment extends Document {
    postId: mongoose.Types.ObjectId;
    authorId: mongoose.Types.ObjectId;
    authorAlias: string;
    content: string;
    createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
    {
        postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        authorAlias: { type: String, required: true },
        content: { type: String, required: true, maxlength: 2000 , trim:true },
    },
    { timestamps:true }
);

CommentSchema.index({ postId: 1, createdAt: -1 });

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
