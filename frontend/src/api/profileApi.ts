import api from "@/lib/axios";
import type { FeedResponse } from "@/types";

export interface ProfileStats {
  user: {
    id: string;
    alias: string;
    avatarUrl?: string;
    empathyScore: number;
    createdAt: string;
  };
  stats: {
    posts: number;
    reactions: number;
    bookmarks: number;
  };
}

export const fetchProfileStats = async (): Promise<ProfileStats> => {
  const res = await api.get<ProfileStats>("/profile");
  return res.data;
};

export const fetchUserPosts = async (page = 1, limit = 10): Promise<FeedResponse> => {
  const res = await api.get<FeedResponse>(`/profile/posts?page=${page}&limit=${limit}`);
  return res.data;
};

export const fetchUserBookmarks = async (page = 1, limit = 10): Promise<FeedResponse> => {
  const res = await api.get<FeedResponse>(`/profile/bookmarks?page=${page}&limit=${limit}`);
  return res.data;
};
