import { Heart, Users, Shield, Sparkles, MessageSquare, AlertTriangle, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Post, ReactionType } from "@/types";
import useAuthStore from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReaction, toggleBookmark } from "@/api/postApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
  "mental-health": { label: "Mental Health", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
  relationships: { label: "Relationships", color: "text-teal-400", bg: "bg-teal-400/10 border-teal-400/20" },
  work: { label: "Workplace", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  family: { label: "Family", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  identity: { label: "Identity", color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20" },
};

const reactionConfig: { type: ReactionType; icon: typeof Heart; label: string; activeColor: string }[] = [
  { type: "feel_this", icon: Heart, label: "Feel This", activeColor: "text-rose-400" },
  { type: "not_alone", icon: Users, label: "Not Alone", activeColor: "text-blue-400" },
  { type: "stay_strong", icon: Shield, label: "Stay Strong", activeColor: "text-emerald-400" },
  { type: "sending_strength", icon: Sparkles, label: "Sending Strength", activeColor: "text-amber-400" },
];

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const cat = categoryConfig[post.category] || { label: post.category, color: "text-gray-400", bg: "bg-gray-400/10 border-gray-400/20" };


  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: false });

  const reactionMutation = useMutation({
    mutationFn: ({ type }: { type: ReactionType }) => toggleReaction(post._id, type),
    onMutate: async ({ type }) => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      const previousFeeds = queryClient.getQueriesData({ queryKey: ["feed"] });

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

      return { previousFeeds };
    },
    onError: (err, variables, context) => {
      if (context?.previousFeeds) {
        context.previousFeeds.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error("Failed to react. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: () => toggleBookmark(post._id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      const previousFeeds = queryClient.getQueriesData({ queryKey: ["feed"] });

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

      return { previousFeeds };
    },
    onSuccess: (data) => {
      toast.success(data.action === "added" ? "Post bookmarked" : "Bookmark removed");
    },
    onError: (err, variables, context) => {
      if (context?.previousFeeds) {
        context.previousFeeds.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error("Failed to update bookmark");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const handleReaction = (e: React.MouseEvent, type: ReactionType) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast("Sign in to react to posts", { icon: "🔒" });
      return;
    }
    reactionMutation.mutate({ type });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast("Sign in to bookmark posts", { icon: "🔒" });
      return;
    }
    bookmarkMutation.mutate();
  };

  const isBookmarked = !!post.isBookmarked;

  return (
    <article className="rounded-2xl border border-[#2A2A3E] bg-[#12121A] overflow-hidden transition-all hover:border-[#3A3A4E]">
      {/* Crisis support banner */}
      {post.crisis?.flagged && (
        <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/20">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-300/90">
            <span className="font-semibold">NEEDS SUPPORT</span> — If you or someone you know needs help, please reach out to a crisis helpline.
          </p>
        </div>
      )}

      <div className="p-5">
        {/* Header: alias + time + category */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-[#9D8FFF]">
              {post.authorAlias}
            </span>
            <span className="text-[#606078] text-xs">•</span>
            <span className="text-xs text-[#606078]">{timeAgo} ago</span>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${cat.bg} ${cat.color}`}>
            {cat.label}
          </span>
        </div>

        {/* Content */}
        <p className="text-[#C8C8D8] text-sm leading-relaxed mb-4 whitespace-pre-wrap">
          {post.content}
        </p>

        {/* Image */}
        {post.image && (
          <div className="mb-4 rounded-xl overflow-hidden border border-[#2A2A3E]">
            <img
              src={post.image}
              alt="Post attachment"
              className="w-full max-h-80 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Reaction bar - always 4 reactions */}
        <div className="flex items-center gap-2 flex-wrap">
          {reactionConfig.map(({ type, icon: Icon, label, activeColor }) => {
            const count = post.reactionCounts?.[type] || 0;
            const hasCount = count > 0;

            return (
              <button
                key={type}
                onClick={(e) => handleReaction(e, type)}
                disabled={reactionMutation.isPending}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all group ${hasCount
                  ? `border-[#2A2A3E] bg-[#1C1C28] hover:border-[#3A3A4E] ${activeColor}`
                  : "border-[#2A2A3E] bg-transparent text-[#606078] hover:border-[#3A3A4E] hover:text-[#A0A0B8] hover:bg-[#1C1C28]"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
                <span className={`ml-0.5 ${hasCount ? "text-[#A0A0B8]" : "text-[#505068]"}`}>
                  {formatCount(count)}
                </span>
              </button>
            );
          })}

          {/* Comment count */}
          <button
            onClick={() => navigate(`/post/${post._id}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2A2A3E] text-xs font-medium text-[#606078] hover:border-[#3A3A4E] hover:text-[#A0A0B8] hover:bg-[#1C1C28] transition-all ml-auto"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{post.commentCount}</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            disabled={bookmarkMutation.isPending}
            className={`inline-flex items-center justify-center p-2 rounded-full border transition-all disabled:opacity-50 ${isBookmarked
              ? "border-amber-400/50 bg-amber-400/10 text-amber-400"
              : "border-[#2A2A3E] text-[#606078] hover:border-[#3A3A4E] hover:text-[#7C6FF7] hover:bg-[#1C1C28]"
              }`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark post"}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""} ${bookmarkMutation.isPending ? "animate-pulse" : ""
                }`}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export default PostCard;
