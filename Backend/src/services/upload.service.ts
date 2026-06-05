import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { AppError }from "../utils/appError.js";
 
export const uploadImage = async (file: Express.Multer.File) => {
  if (!file) throw new AppError("No image file provided", 400);
 
  const { url, publicId } = await uploadToCloudinary(file.buffer, "truthwall/posts");
 
  return { url, publicId };
};
