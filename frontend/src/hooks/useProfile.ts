import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchProfileStats, fetchUserPosts, fetchUserBookmarks } from "@/api/profileApi";

export const useProfileStats = () => {
  return useQuery({
    queryKey: ["profile", "stats"],
    queryFn: fetchProfileStats,
  });
};

export const useUserPosts = () => {
  return useInfiniteQuery({
    queryKey: ["profile", "posts"],
    queryFn: ({ pageParam = 1 }) => fetchUserPosts(pageParam, 10),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });
};

export const useUserBookmarks = () => {
  return useInfiniteQuery({
    queryKey: ["profile", "bookmarks"],
    queryFn: ({ pageParam = 1 }) => fetchUserBookmarks(pageParam, 10),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });
};
