import { Router } from "express";
import { createPostController, getFeedController, getPostByIdController, deletePostController } from "../controllers/post.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import  { createPostSchema, feedQuerySchema , postParamSchema } from "../validators/post.validator.js";
import { protect } from "../middleware/auth.middleware.js";

const postRouter = Router();

postRouter.post("/posts", protect, validate({ body: createPostSchema }), createPostController);
postRouter.get("/posts/feed", validate({ query: feedQuerySchema }), getFeedController);
postRouter.get("/posts/:id", validate({ params: postParamSchema }), getPostByIdController);
postRouter.delete("/posts/:id", protect, validate({ params: postParamSchema }), deletePostController);

export default postRouter;