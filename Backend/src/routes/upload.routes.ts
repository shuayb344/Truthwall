import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { uploadImageHandler } from "../controllers/upload.controller.js";
import upload from "../middleware/upload.js";
const router = Router();
router.post("/", protect, upload.single("image"), uploadImageHandler);
 
export default router;
