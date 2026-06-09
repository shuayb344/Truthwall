import { z } from "zod";
 
export const bookmarkParamsSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});
 
export const reportSchema = z.object({
  reason: z.string().min(1, "Reason is required").max(500),
});
 
