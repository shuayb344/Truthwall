import { Router } from "express";
import { createCommentHandler, getCommentsHandler, toggleReactionHandler, toggleCommentLikeHandler } from "../controllers/comment.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createCommentSchema, commentQuerySchema, reactionSchema } from "../validators/comment.validator.js";
import { protect, optionalProtect } from "../middleware/auth.middleware.js";


const commentRouter = Router({ mergeParams: true });

commentRouter.post("/comments", protect,  validate({ body : createCommentSchema }), createCommentHandler);
commentRouter.get("/comments", optionalProtect, validate({ query : commentQuerySchema }), getCommentsHandler);
commentRouter.post("/reactions", protect, validate({ body : reactionSchema }), toggleReactionHandler);
commentRouter.post("/comments/:commentId/like", protect, toggleCommentLikeHandler);


export default commentRouter;