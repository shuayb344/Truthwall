import mongoose , { Schema , Document } from "mongoose";
import generateAlias from "../utils/generateAlias.js";

export interface IUser extends Document {
  email: string;
  password?: string;
  googleId?: string;
  alias: string;
  avatarUrl?: string;
  empathyScore: number;
  createdAt: Date;
  updatedAt: Date;
  role : "user" | "admin";
}

export const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true , lowercase: true, trim: true },
  password: { type: String },
  googleId: { type: String },
  alias: { type: String, required: true , unique: true , default: generateAlias },
  avatarUrl: { type: String , default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" },
  empathyScore: { type: Number, default: 0 },
  role : {type : String , enum : ["user" , "admin"] , default : "user"}
}, {
  timestamps: true,
});


const User = mongoose.model<IUser>("User", UserSchema);

export default User;