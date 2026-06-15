import { MoreHorizontal, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/types";
import { useNavigate } from "react-router-dom";
import { categoryConfig } from "@/constants/postConstants";
import { usePostActions } from "@/hooks/usePostActions";
import CrisisBanner from "@/components/post/CrisisBanner";
import PostReactions from "@/components/post/PostReactions";

interface PostContentProps {
  post: Post;
  commentCount: number;
}

const PostContent = ({ post, commentCount }: PostContentProps) => {
  const navigate = useNavigate();
  const { handleReaction, handleBookmark, isReactionPending, isBookmarkPending } = usePostActions(post);

  const cat = categoryConfig[post.category] || {
    label: post.category,
    color: "text-gray-400",
    bg: "bg-gray-400/10 border-gray-400/20",
  };
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: false });

  return (
    <article className="rounded-2xl border border-[#2A2A3E] bg-[#12121A] overflow-hidden">
      {/* Crisis support banner */}
      {post.crisis?.flagged && <CrisisBanner className="px-6 py-3" />}

      <div className="p-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-[#A0A0B8] hover:text-[#EEEEF5] transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Header: alias + time + menu */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7C6FF7]/20 border border-[#7C6FF7]/30 flex items-center justify-center text-sm font-bold text-[#7C6FF7]">
              {post.authorAlias.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="font-mono text-sm font-semibold text-[#9D8FFF]">
                @{post.authorAlias}
              </span>
              <p className="text-xs text-[#606078]">{timeAgo} ago</p>
            </div>
          </div>
          <button className="p-2 rounded-lg text-[#606078] hover:text-[#A0A0B8] hover:bg-[#1C1C28] transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <p className="text-[#C8C8D8] text-base leading-relaxed mb-5 whitespace-pre-wrap">
          {post.content}
        </p>

        {/* Image */}
        {post.image && (
          <div className="mb-5 rounded-xl overflow-hidden border border-[#2A2A3E]">
            <img
              src={post.image}
              alt="Post attachment"
              className="w-full max-h-[500px] object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Category badge */}
        <div className="flex items-center gap-2 mb-5">
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium border ${cat.bg} ${cat.color}`}>
            #{cat.label}
          </span>
        </div>

        {/* Reaction bar */}
        <PostReactions
          post={post}
          handleReaction={handleReaction}
          handleBookmark={handleBookmark}
          isReactionPending={isReactionPending}
          isBookmarkPending={isBookmarkPending}
          commentCount={commentCount}
          variant="content"
          iconSize={4}
        />
      </div>
    </article>
  );
};

export default PostContent;
