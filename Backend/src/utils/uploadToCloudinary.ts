import cloudinary from "../config/cloudinary.js";
import { AppError } from "./appError.js";

 
interface UploadResult {
  url: string;
  publicId: string;
}
 
const uploadToCloudinary = (
  buffer: Buffer,
  folder: string = "truthwall"
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [
          { width: 1200, crop: "limit" },   // cap width at 1200px
          { quality: "auto" },               // auto compress
          { fetch_format: "auto" },          // serve webp where supported
        ],
      },
      (error, result) => {
        if (error || !result) {
          return reject(new AppError("Image upload failed", 500));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    stream.end(buffer);
  });
};
 
export default uploadToCloudinary;
