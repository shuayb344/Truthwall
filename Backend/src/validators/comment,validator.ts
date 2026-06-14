import { z } from "zod";
const reactionTypes = ["feel_this", "not_alone", "stay_strong", "sending_strength"] as const;

export const createCommentSchema = z.object({
  content:z.string().min(1,"Comment is required").max(2000,"Comment is too long").trim(),
  parentId: z.string().optional()
})
export const reactionSchema = z.object({
  type: z.enum(reactionTypes, "Invalid reaction type")
})
export const commentQuerySchema = z.object({
  page : z.coerce.number().min(1).optional().default(1),
  limit : z.coerce.number().min(1).max(50).optional().default(10)
})
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type ReactionInput = z.infer<typeof reactionSchema>;
export type CommentQueryInput = z.infer<typeof commentQuerySchema>;