import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import type { Comment } from "@/types";
import { useState } from "react";
import CommentInput from "./CommentInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleCommentLike } from "@/api/postApi";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

interface CommentItemProps {
  comment: Comment;
  replies?: Comment[];
}

const CommentItem = ({ comment, replies = [] }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: false });

  const likeMutation = useMutation({
    mutationFn: () => toggleCommentLike(comment.postId, comment._id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["comments", comment.postId] });
      const previousComments = queryClient.getQueryData(["comments", comment.postId]);

      queryClient.setQueryData(["comments", comment.postId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            comments: page.comments.map((c: any) => {
              if (c._id === comment._id) {
                return {
                  ...c,
                  isLiked: !c.isLiked,
                  likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1,
                };
              }
              return c;
            }),
          })),
        };
      });

      return { previousComments };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", comment.postId], context.previousComments);
      }
      toast.error("Failed to update like");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", comment.postId] });
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      toast("Sign in to like comments", { icon: "🔒" });
      return;
    }
    likeMutation.mutate();
  };

  return (
    <div className="group">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#7C6FF7]/15 border border-[#7C6FF7]/20 flex items-center justify-center text-[10px] font-bold text-[#7C6FF7] flex-shrink-0 mt-0.5">
          {comment.authorAlias.slice(0, 2).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold text-[#9D8FFF]">
              @{comment.authorAlias}
            </span>
            <span className="text-[10px] text-[#606078]">{timeAgo} ago</span>
          </div>

          {/* Content */}
          <div className="bg-[#1C1C28] border border-[#2A2A3E]/50 rounded-xl rounded-tl-sm px-4 py-3">
            <p className="text-sm text-[#C8C8D8] leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-1.5 ml-1">
            <button 
              onClick={handleLike}
              className={`inline-flex items-center gap-1 text-[10px] transition-colors ${
                comment.isLiked ? "text-rose-400" : "text-[#606078] hover:text-rose-400"
              }`}
            >
              <Heart className={`w-3 h-3 ${comment.isLiked ? "fill-current" : ""}`} />
              {comment.likesCount > 0 && <span>{comment.likesCount}</span>}
            </button>
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="text-[10px] text-[#606078] hover:text-[#A0A0B8] transition-colors font-medium"
            >
              ↩ Reply
            </button>
          </div>

          {/* Reply input */}
          {isReplying && (
            <div className="mt-3">
              <CommentInput 
                postId={comment.postId} 
                parentId={comment._id}
                onCancel={() => setIsReplying(false)}
                onSuccess={() => setIsReplying(false)}
              />
            </div>
          )}

          {/* Nested Replies */}
          {replies.length > 0 && (
            <div className="mt-4 space-y-4 border-l border-[#2A2A3E] pl-4">
              {replies.map((reply) => (
                <CommentItem key={reply._id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default CommentItem;
