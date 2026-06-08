import mongoose , { Schema, Document } from "mongoose";

export interface IReport extends Document {
  postId: mongoose.Types.ObjectId;
  reportedById: mongoose.Types.ObjectId;
  reason: string;
  resolved: boolean;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    reportedById: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true, maxlength: 1000, trim: true },
    resolved: { type: Boolean, default: false }
  },
  { timestamps:true }
);
ReportSchema.index({ resolved: 1, createdAt: -1 });

const Report = mongoose.model<IReport>("Report", ReportSchema);

export default Report;