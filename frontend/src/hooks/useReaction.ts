import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { ReactionType } from "@/types/index";
 
export function useReaction(postId: string, feedKey: unknown[]) {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async (type: ReactionType) => {
      const { data } = await api.post(`/posts/${postId}/react`, { type });
      return data;
    },
    onMutate: async (type) => {
      await queryClient.cancelQueries({ queryKey: feedKey });
      const previous = queryClient.getQueryData(feedKey);
 
      queryClient.setQueryData(feedKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((p: any) => {
              if (p._id !== postId) return p;
              const isSame = p.userReaction === type;
              const counts = { ...p.reactionCounts };
              if (!isSame) counts[type] = (counts[type] ?? 0) + 1;
              else counts[type] = Math.max(0, (counts[type] ?? 1) - 1);
              if (p.userReaction && !isSame)
                counts[p.userReaction] = Math.max(0, (counts[p.userReaction] ?? 1) - 1);
              return { ...p, userReaction: isSame ? null : type, reactionCounts: counts };
            }),
          })),
        };
      });
 
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(feedKey, ctx.previous);
    },
  });
}
