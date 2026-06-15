import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Send, PenLine } from "lucide-react";
import { useCreatePost } from "@/hooks/useCreatePost";
import CategoryPicker from "./CategoryPicker";
import ImageDropZone from "./ImageDropZone";
import type { Category } from "@/types";
import toast from "react-hot-toast";

const WriteForm = () => {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();

  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPermanent, setIsPermanent] = useState(false);

  const charCount = content.length;
  const maxChars = 1000;
  const isValid = content.trim().length > 0 && category !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    createPostMutation.mutate(
      {
        content: content.trim(),
        category: category!,
        isPermanent,
        image: imageUrl || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Confession posted");
          navigate("/feed");
        },
        onError: () => {
          toast.error("Failed to post confession");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#2A2A2A]/50">
        <div className="w-10 h-10 rounded-xl bg-[#E03030]/15 border border-[#E03030]/20 flex items-center justify-center">
          <PenLine className="w-5 h-5 text-[#E03030]" />
        </div>
        <div>
          <h1 className="text-lg font-heading text-[#F5F5F5]">New Confession</h1>
          <p className="text-xs text-[#555555]">Share anonymously. Be heard.</p>
        </div>
      </div>

      {/* Text editor */}
      <div>
        <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
          Your Confession
        </label>
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share your truth..."
            maxLength={maxChars}
            rows={8}
            className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-5 py-4 text-sm text-[#C8C8D8] placeholder:text-[#555555] resize-none focus:outline-none focus:border-[#E03030]/50 focus:ring-1 focus:ring-[#E03030]/20 transition-all leading-relaxed"
          />
          <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
            <span
              className={`text-xs font-mono transition-colors ${
                charCount > maxChars * 0.9
                  ? charCount >= maxChars
                    ? "text-red-400"
                    : "text-amber-400"
                  : "text-[#555555]"
              }`}
            >
              {charCount.toLocaleString()}/{maxChars.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Category picker */}
      <CategoryPicker selected={category} onChange={setCategory} />

      {/* Image upload */}
      <ImageDropZone imageUrl={imageUrl} onImageChange={setImageUrl} />

      {/* Expiry toggle */}
      <div>
        <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
          Post Duration
        </label>
        <div className="inline-flex rounded-xl bg-[#111111] border border-[#2A2A2A] p-1">
          <button
            type="button"
            onClick={() => setIsPermanent(false)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              !isPermanent
                ? "bg-[#E03030] text-white shadow-lg shadow-[#E03030]/20"
                : "text-[#999999] hover:text-[#F5F5F5]"
            }`}
          >
            Expires in 7 days
          </button>
          <button
            type="button"
            onClick={() => setIsPermanent(true)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isPermanent
                ? "bg-[#E03030] text-white shadow-lg shadow-[#E03030]/20"
                : "text-[#999999] hover:text-[#F5F5F5]"
            }`}
          >
            Permanent
          </button>
        </div>
        <p className="text-xs text-[#555555] mt-2">
          {isPermanent
            ? "This post will stay on the wall forever"
            : "This post will automatically disappear after 7 days"}
        </p>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#2A2A2A]/50">
        <button
          type="submit"
          disabled={!isValid || createPostMutation.isPending}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E03030] hover:bg-[#C42020] text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#E03030]/20 hover:shadow-xl hover:shadow-[#E03030]/30"
        >
          {createPostMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Post Confession
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/feed")}
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#2A2A2A] text-sm font-medium text-[#999999] hover:text-[#F5F5F5] hover:border-[#3A3A4E] transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WriteForm;
