import { useState } from "react";
import { Image, Smile } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/api/postApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CommentInputProps {
  postId: string;
  parentId?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const CommentInput = ({ postId, parentId, onCancel, onSuccess }: CommentInputProps) => {
  const [content, setContent] = useState("");
  const { isAuthenticated, user } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => createComment(postId, content.trim(), parentId),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      toast.success(parentId ? "Reply posted" : "Response posted");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to post response");
    },
  });


  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast("Sign in to respond", { icon: "🔒" });
      navigate("/auth");
      return;
    }
    if (!content.trim()) return;
    mutation.mutate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-[#1C1C28] border border-[#2A2A3E] rounded-2xl p-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#7C6FF7]/15 border border-[#7C6FF7]/20 flex items-center justify-center text-xs font-bold text-[#7C6FF7] flex-shrink-0">
          {isAuthenticated && user
            ? user.alias.slice(0, 2).toUpperCase()
            : "?"
          }
        </div>

        {/* Input area */}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Respond with empathy..."
            rows={3}
            maxLength={2000}
            className="w-full bg-transparent text-sm text-[#C8C8D8] placeholder:text-[#606078] resize-none focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2A2A3E]/50">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-[#606078] hover:text-[#A0A0B8] hover:bg-[#2A2A3E]/50 transition-all">
            <Image className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-[#606078] hover:text-[#A0A0B8] hover:bg-[#2A2A3E]/50 transition-all">
            <Smile className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs text-[#606078] hover:text-[#A0A0B8] transition-all font-medium"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || mutation.isPending}
            className="px-5 py-2 rounded-xl bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#7C6FF7]/20"
          >
            {mutation.isPending ? "Posting..." : parentId ? "Reply" : "Reply"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CommentInput;
