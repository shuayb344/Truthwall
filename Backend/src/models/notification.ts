import mongoose, { Document, Schema } from "mongoose";
 
export type NotificationType = "reaction" | "comment";
 
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: NotificationType;
  postId: mongoose.Types.ObjectId;
  message: string;
  read: boolean;
  createdAt: Date;
}
const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["reaction", "comment"], required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, {
  timestamps: true,
});

NotificationSchema.index({ userId: 1, createdAt: -1 });
 
const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
export default Notification;