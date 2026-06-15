import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReaction, toggleBookmark } from "@/api/postApi";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import type { Post, ReactionType } from "@/types";

export const usePostActions = (post: Post) => {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const reactionMutation = useMutation({
    mutationFn: ({ type }: { type: ReactionType }) => toggleReaction(post._id, type),
    onMutate: async ({ type }) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      await queryClient.cancelQueries({ queryKey: ["post", post._id] });
      const previousFeeds = queryClient.getQueriesData({ queryKey: ["feed"] });
      const previousPost = queryClient.getQueryData(["post", post._id]);


      queryClient.setQueriesData({ queryKey: ["feed"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((p: any) => {
              if (p._id === post._id) {
                const currentCount = p.reactionCounts[type] || 0;
                return {
                  ...p,
                  reactionCounts: {
                    ...p.reactionCounts,
                    [type]: currentCount + 1,
                  },
                };
              }
              return p;
            }),
          })),
        };
      });


      queryClient.setQueryData(["post", post._id], (old: any) => {
        if (!old) return old;
        const currentCount = old.reactionCounts[type] || 0;
        return {
          ...old,
          reactionCounts: { ...old.reactionCounts, [type]: currentCount + 1 },
        };
      });

      return { previousFeeds, previousPost };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFeeds) {
        context.previousFeeds.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousPost) {
        queryClient.setQueryData(["post", post._id], context.previousPost);
      }
      toast.error("Failed to react. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => toggleBookmark(post._id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      await queryClient.cancelQueries({ queryKey: ["post", post._id] });

      const previousFeeds = queryClient.getQueriesData({ queryKey: ["feed"] });
      const previousPost = queryClient.getQueryData(["post", post._id]);


      queryClient.setQueriesData({ queryKey: ["feed"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((p: any) => {
              if (p._id === post._id) {
                return { ...p, isBookmarked: !p.isBookmarked };
              }
              return p;
            }),
          })),
        };
      });


      queryClient.setQueryData(["post", post._id], (old: any) => {
        if (!old) return old;
        return { ...old, isBookmarked: !old.isBookmarked };
      });

      return { previousFeeds, previousPost };
    },
    onSuccess: (data) => {
      toast.success(data.action === "added" ? "Post bookmarked" : "Bookmark removed");
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFeeds) {
        context.previousFeeds.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      if (context?.previousPost) {
        queryClient.setQueryData(["post", post._id], context.previousPost);
      }
      toast.error("Failed to update bookmark");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const handleReaction = (type: ReactionType, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isAuthenticated) {
      toast("Sign in to react to posts", { icon: "🔒" });
      return;
    }
    reactionMutation.mutate({ type });
  };

  const handleBookmark = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isAuthenticated) {
      toast("Sign in to bookmark posts", { icon: "🔒" });
      return;
    }
    bookmarkMutation.mutate();
  };

  return {
    handleReaction,
    handleBookmark,
    isReactionPending: reactionMutation.isPending,
    isBookmarkPending: bookmarkMutation.isPending,
  };
};
