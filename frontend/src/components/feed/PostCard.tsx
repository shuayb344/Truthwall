import type { Post } from "@/types";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { categoryConfig } from "@/constants/postConstants";
import { usePostActions } from "@/hooks/usePostActions";
import CrisisBanner from "@/components/post/CrisisBanner";
import PostReactions from "@/components/post/PostReactions";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();
  const { handleReaction, handleBookmark, isReactionPending, isBookmarkPending } = usePostActions(post);

  const cat = categoryConfig[post.category] || {
    label: post.category,
    color: "text-gray-400",
    bg: "bg-gray-400/10 border-gray-400/20",
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: false });

  return (
    <article
      onClick={() => navigate(`/post/${post._id}`)}
      className="rounded-2xl border border-[#2A2A3E] bg-[#12121A] overflow-hidden transition-all hover:border-[#3A3A4E] cursor-pointer"
    >
      {/* Crisis support banner */}
      {post.crisis?.flagged && <CrisisBanner />}

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

        {/* Reaction bar */}
        <PostReactions
          post={post}
          handleReaction={handleReaction}
          handleBookmark={handleBookmark}
          isReactionPending={isReactionPending}
          isBookmarkPending={isBookmarkPending}
          commentCount={post.commentCount}
          onCommentClick={(e) => {
            e.stopPropagation();
            navigate(`/post/${post._id}`);
          }}
        />
      </div>
    </article>
  );
};

export default PostCard;

