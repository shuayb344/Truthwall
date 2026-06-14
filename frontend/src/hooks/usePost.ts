import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostById, fetchComments } from "@/api/postApi";

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });
};

export const useComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 1 }) => fetchComments(postId, pageParam, 10),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!postId,
  });
};
