import { z } from "zod";
const categories = ["mental-health", "relationships", "work", "family", "identity"] as const;
const sortOptions = ["latest", "trending"] as const;
export const createPostSchema = z.object({
  content: z.string().min(1, "Content is required").max(5000, "Content must be at most 5000 characters"),
  category: z.enum(categories, { message: "invalid category" }),
  isPermanent: z.boolean().optional().default(false),
});
export const postParamSchema = z.object({
  id: z.string().min(1, "Post ID is required"),
});
export const feedQuerySchema = z.object({
  category: z.enum(categories).optional(),
  sort:z.enum(sortOptions).optional().default("latest"),
  page : z.coerce.number().min(1).optional().default(1),
  limit : z.coerce.number().min(1).max(50).optional().default(10),
})

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type PostParamInput = z.infer<typeof postParamSchema>;
export type FeedQueryInput = z.infer<typeof feedQuerySchema>;

