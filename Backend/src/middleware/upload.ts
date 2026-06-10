import multer from "multer";
import {AppError} from "../utils/appError.js";
 
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
 
const storage = multer.memoryStorage();
 
const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Only JPEG, PNG, and WebP images are allowed", 400));
  }
};
 
const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});
 
export default upload;
