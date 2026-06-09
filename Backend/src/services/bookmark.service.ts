import Post from "../models/Post.js";
import { AppError } from "../utils/appError.js";
import type { IUser } from "../models/User.js";
import Bookmark from "../models/Bookmark.js";



export const toggleBookmark = async (user: IUser, postId: string) => {
  const post = await Post.findById(postId);
  if(!post){
    throw new AppError("Post not found", 404);
  }
  const existingBookmark = await Bookmark.findOne({ userId: user._id, postId });
  if(existingBookmark){
    await existingBookmark.deleteOne();
    return { action : "removed" , postId };
  }
  await Bookmark.create({ userId: user._id, postId });
  return { action : "added" , postId };
};

export const getBookmarks = async (user: IUser) => {
 const bookmarks = await Bookmark.find({userId : user._id}).sort({createdAt : -1}).populate("postId")

 const validBookmarks = bookmarks.filter((b)=> b.postId !== null)

 return validBookmarks;

}