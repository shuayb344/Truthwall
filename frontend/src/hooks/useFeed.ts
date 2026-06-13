import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/api/postApi";

interface UseFeedOptions {
  category?: string;
  sort?: "latest" | "trending";
  limit?: number;
}

export const useFeed = ({ category, sort = "latest", limit = 10 }: UseFeedOptions) => {
  return useInfiniteQuery({
    queryKey: ["feed", category, sort],
    queryFn: ({ pageParam = 1 }) =>
      fetchFeed({
        page: pageParam,
        limit,
        category: category || undefined,
        sort,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
  });
};
