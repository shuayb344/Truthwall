import { Router } from "express";
import {
  getProfileHandler,
  getUserPostsHandler,
  getUserBookmarksHandler,
} from "../controllers/profile.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, getProfileHandler);
router.get("/posts", protect, getUserPostsHandler);
router.get("/bookmarks", protect, getUserBookmarksHandler);

export default router;
