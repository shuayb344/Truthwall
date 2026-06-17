import { Trash2 } from "lucide-react";
import type { Post } from "@/types";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { categoryConfig } from "@/constants/postConstants";
import { usePostActions } from "@/hooks/usePostActions";
import CrisisBanner from "@/components/post/CrisisBanner";
import PostReactions from "@/components/post/PostReactions";
import useAuthStore from "@/store/authStore";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { handleReaction, handleBookmark, handleDelete, isReactionPending, isBookmarkPending, isDeletePending } = usePostActions(post);

  const isAuthor = user?._id === post.authorId;
  const isAdmin = user?.role === "admin";
  const canDelete = isAuthor || isAdmin;

  const cat = categoryConfig[post.category] || {
    label: post.category,
    color: "text-gray-400",
    bg: "bg-gray-400/10 border-gray-400/20",
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: false });

  return (
    <article
      onClick={() => navigate(`/post/${post._id}`)}
      className="confessional-card group rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Crisis support banner */}
      {post.crisis?.flagged && <CrisisBanner />}

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E03030]/15 border border-[#E03030]/20 flex items-center justify-center text-[10px] font-heading text-[#E03030] flex-shrink-0">
              {post.authorAlias.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
              <span className="font-mono text-xs font-semibold text-text-alias leading-tight">
                @{post.authorAlias}
              </span>
              <span className="text-[10px] lg:text-[12px] text-[#555555]">{timeAgo} ago</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeletePending}
                className="p-1.5 rounded-lg text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 transition-all disabled:opacity-50"
                title="Delete Post"
              >
                <Trash2 size={16} />
              </button>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${cat.bg} ${cat.color}`}>
              {cat.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <p className="text-[#C8C8D8] text-sm leading-relaxed mb-4 whitespace-pre-wrap">
          {post.content}
        </p>

        {/* Image */}
        {post.image && (
          <div className="mb-4 rounded-xl overflow-hidden border border-[#2A2A2A]">
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
