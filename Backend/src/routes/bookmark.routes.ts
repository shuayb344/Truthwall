import { toggleBookmarkHandler , getBookmarksHandler } from "../controllers/bookmark.controller.js";
import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { bookmarkParamsSchema } from "../validators/bookmark.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.post("/:postId", protect, validate({ params: bookmarkParamsSchema }), toggleBookmarkHandler);
router.get("/", protect, getBookmarksHandler);

export default router;