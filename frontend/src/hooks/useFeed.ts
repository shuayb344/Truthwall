import type { FeedResponse } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { Category } from "@/types"
import type { SortMode } from "@/types/feed"

const LIMIT = 10

export const useFeed = (category: Category | "all", sort: SortMode) => {
  return useInfiniteQuery<FeedResponse>({
    queryKey: ["feed", category, sort],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: String(LIMIT),
        sort,
        ...(category !== "all" ? { category } : {}),
      })
      const response = await api.get(`/posts?${params.toString()}`)
      return response.data
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    
  })
}
