import mongoose , { Schema , Document } from "mongoose";

export interface IReaction extends Document {
    postId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    type: "feel_this" | "not_alone" | "stay_strong" | "sending_strength";
    createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>(
    {
        postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["feel_this", "not_alone", "stay_strong", "sending_strength"], required: true },
    },
    { timestamps:true }
);

ReactionSchema.index({ postId: 1, userId: 1 }, { unique: true });

const Reaction = mongoose.model<IReaction>("Reaction", ReactionSchema);

export default Reaction;