import api from "@/lib/axios";
import type { FeedResponse, Post, CommentsResponse, ReactionType, Category } from "@/types";

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

export const fetchPostById = async (id: string): Promise<Post> => {
  const res = await api.get<Post>(`/posts/${id}`);
  return res.data;
};

export const fetchComments = async (
  postId: string,
  page = 1,
  limit = 10
): Promise<CommentsResponse> => {
  const res = await api.get<{ success: boolean; data: CommentsResponse }>(
    `/posts/${postId}/comments?page=${page}&limit=${limit}`
  );
  return res.data.data;
};

export const createComment = async (
  postId: string,
  content: string,
  parentId?: string
): Promise<unknown> => {
  const res = await api.post(`/posts/${postId}/comments`, { content, parentId });
  return res.data;
};

export const toggleCommentLike = async (
  postId: string,
  commentId: string
): Promise<{ liked: boolean; likesCount: number }> => {
  const res = await api.post(`/posts/${postId}/comments/${commentId}/like`);
  return res.data;
};


export interface CreatePostData {
  content: string;
  category: Category;
  isPermanent?: boolean;
  image?: string;
}

export const createPost = async (data: CreatePostData): Promise<Post> => {
  const res = await api.post<Post>("/posts", data);
  return res.data;
};

export const uploadImage = async (
  file: File
): Promise<{ url: string; publicId: string }> => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await api.post<{ url: string; publicId: string }>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
