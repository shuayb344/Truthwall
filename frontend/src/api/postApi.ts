import api from "@/lib/axios";
import type { FeedResponse, ReactionType } from "@/types";

export interface FeedParams {
  page?: number;
  limit?: number;
  category?: string;
  sort?: "latest" | "trending";
}

export const fetchFeed = async (params: FeedParams): Promise<FeedResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.category) query.set("category", params.category);
  if (params.sort) query.set("sort", params.sort);

  const res = await api.get<FeedResponse>(`/posts/feed?${query.toString()}`);
  return res.data;
};

export const toggleReaction = async (
  postId: string,
  type: ReactionType
): Promise<{ message: string; type: ReactionType; reactionCounts: Record<ReactionType, number> }> => {
  const res = await api.post(`/posts/${postId}/reactions`, { type });
  return res.data;
};

export const toggleBookmark = async (
  postId: string
): Promise<{ action: "added" | "removed"; postId: string }> => {
  const res = await api.post(`/bookmarks/${postId}`);
  return res.data;
};
