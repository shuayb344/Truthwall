import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReaction, toggleBookmark, deletePost, reportPost } from "@/api/postApi";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { Post, ReactionType } from "@/types";

export const usePostActions = (post: Post) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const reactionMutation = useMutation({
// ...
// ... (omitting reactionMutation lines for brevity in instruction, will be included in full replacement)
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

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post._id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      const previousQueries = queryClient.getQueriesData({ queryKey: ["feed"] });

      queryClient.setQueriesData({ queryKey: ["feed"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.filter((p: any) => p._id !== post._id),
          })),
        };
      });

      return { previousQueries };
    },
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      if (window.location.pathname.startsWith("/post/")) {
        navigate("/feed");
      }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error("Failed to delete post");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const reportMutation = useMutation({
    mutationFn: (reason: string) => reportPost(post._id, reason),
    onSuccess: () => {
      toast.success("Post reported successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to report post");
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

  const handleDelete = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm("Are you sure you want to delete this post?")) return;
    deleteMutation.mutate();
  };

  const handleReport = (reason: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isAuthenticated) {
      toast("Sign in to report posts", { icon: "🔒" });
      return;
    }
    reportMutation.mutate(reason);
  };

  return {
    handleReaction,
    handleBookmark,
    handleDelete,
    handleReport,
    isReactionPending: reactionMutation.isPending,
    isBookmarkPending: bookmarkMutation.isPending,
    isDeletePending: deleteMutation.isPending,
    isReportPending: reportMutation.isPending,
  };
};
