import { Router } from "express";
import { createPostController, getFeedController, getPostByIdController, deletePostController, reportPostController } from "../controllers/post.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createPostSchema, feedQuerySchema, postParamSchema } from "../validators/post.validator.js";
import { protect, optionalProtect } from "../middleware/auth.middleware.js";

const postRouter = Router();

postRouter.post("/posts", protect, validate({ body: createPostSchema }), createPostController);
postRouter.get("/posts/feed", optionalProtect, validate({ query: feedQuerySchema }), getFeedController);
postRouter.get("/posts/:id", optionalProtect, validate({ params: postParamSchema }), getPostByIdController);
postRouter.delete("/posts/:id", protect, validate({ params: postParamSchema }), deletePostController);
postRouter.post("/posts/:id/report", protect, reportPostController);


export default postRouter;