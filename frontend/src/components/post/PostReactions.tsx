import { MessageSquare, Bookmark } from "lucide-react";
import type { Post, ReactionType } from "@/types";
import { reactionConfig } from "@/constants/postConstants";
import { formatCount } from "@/utils/format";

interface PostReactionsProps {
  post: Post;
  handleReaction: (type: ReactionType, e?: React.MouseEvent) => void;
  handleBookmark: (e?: React.MouseEvent) => void;
  isReactionPending: boolean;
  isBookmarkPending: boolean;
  commentCount?: number;
  onCommentClick?: (e: React.MouseEvent) => void;
  iconSize?: number;
  variant?: "card" | "content";
}

const PostReactions = ({
  post,
  handleReaction,
  handleBookmark,
  isReactionPending,
  isBookmarkPending,
  commentCount,
  onCommentClick,
  iconSize = 3.5,
  variant = "card"
}: PostReactionsProps) => {
  const isBookmarked = !!post.isBookmarked;
  const showCommentCount = commentCount !== undefined;

  const btnPadding = variant === "card" ? "px-3 py-1.5" : "px-3.5 py-2";
  const iconSizeClass = iconSize === 4 ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className={`flex items-center gap-2 flex-wrap ${variant === "content" ? "pt-4 border-t border-[#2A2A2A]/50" : ""}`}>
      {reactionConfig.map(({ type, icon: Icon, label, activeColor }) => {
        const count = post.reactionCounts?.[type] || 0;
        const hasCount = count > 0;

        return (
          <button
            key={type}
            onClick={(e) => handleReaction(type, e)}
            disabled={isReactionPending}
            className={`inline-flex items-center gap-1.5 ${btnPadding} rounded-full border text-xs font-medium transition-all group ${hasCount
              ? `border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#3A3A4E] ${activeColor}`
              : "border-[#2A2A2A] bg-transparent text-[#555555] hover:border-[#3A3A4E] hover:text-[#999999] hover:bg-[#1A1A1A]"
              }`}
          >
            <Icon className={iconSizeClass} />
            <span>{label}</span>
            <span className={`ml-0.5 ${hasCount ? "text-[#999999]" : "text-[#505068]"}`}>
              {formatCount(count)}
            </span>
          </button>
        );
      })}

      {/* Comment count */}
      {showCommentCount && (
        onCommentClick ? (
          <button
            onClick={onCommentClick}
            className={`inline-flex items-center gap-1.5 ${btnPadding} rounded-full border border-[#2A2A2A] text-xs font-medium text-[#555555] hover:border-[#3A3A4E] hover:text-[#999999] hover:bg-[#1A1A1A] transition-all ml-auto`}
          >
            <MessageSquare className={iconSizeClass} />
            <span>{commentCount}</span>
          </button>
        ) : (
          <div className={`inline-flex items-center gap-1.5 ${btnPadding} rounded-full border border-[#2A2A2A] text-xs font-medium text-[#555555] ml-auto`}>
            <MessageSquare className={iconSizeClass} />
            <span>{commentCount}</span>
          </div>
        )
      )}

      {/* Bookmark */}
      <button
        onClick={handleBookmark}
        disabled={isBookmarkPending}
        className={`inline-flex items-center justify-center p-2 rounded-full border transition-all disabled:opacity-50 ${isBookmarked
          ? "border-border-defaultmber-400/50 bg-primarylevatedmber-400/10 text-amber-400"
          : "border-[#2A2A2A] text-[#555555] hover:border-[#3A3A4E] hover:text-[#E03030] hover:bg-[#1A1A1A]"
          } ${!showCommentCount ? "ml-auto" : ""}`}
        title={isBookmarked ? "Remove bookmark" : "Bookmark post"}
      >
        <Bookmark
          className={`${iconSizeClass} ${isBookmarked ? "fill-current" : ""} ${isBookmarkPending ? "animate-pulse" : ""}`}
        />
      </button>
    </div>
  );
};

export default PostReactions;
