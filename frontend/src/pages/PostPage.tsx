import { useParams } from "react-router-dom";
import { usePost } from "@/hooks/usePost";
import PostContent from "@/components/post/PostContent";
import CommentThread from "@/components/post/CommentThread";
import PostSkeleton from "@/components/post/PostSkeleton";
import CommentSkeleton from "@/components/post/CommentSkeleton";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = usePost(id!);

  return (
    <div className="px-5 py-6">
      {/* Loading state */}
      {isLoading && (
        <div className="space-y-6">
          <PostSkeleton />
          {/* Dummy Comment Thread Skeleton Section */}
          <div className="mt-8 pt-8 border-t border-[#2A2A2A]/30 space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-4 w-32 bg-[#1A1A1A] rounded animate-pulse" />
              <div className="flex-1 h-px bg-[#2A2A2A]/30" />
            </div>
            <div className="h-24 w-full bg-[#111111] border border-[#2A2A2A] rounded-xl animate-pulse" />
            <div className="space-y-6 mt-6">
              {[1, 2, 3].map(i => (
                <CommentSkeleton key={i} />
              ))}
            </div>
          </div>

        </div>
      )}


      {/* Error state */}
      {isError && !isLoading && (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center mb-4">
            <span className="text-2xl">😔</span>
          </div>
          <p className="text-[#999999] mb-2">This post could not be found</p>
          <p className="text-xs text-[#555555] mb-4">It may have expired or been removed</p>
          <button
            onClick={() => window.history.back()}
            className="text-sm text-[#E03030] hover:text-[#C42020] font-medium"
          >
            Go back
          </button>
        </div>
      )}

      {/* Post content */}
      {post && (
        <>
          <PostContent post={post} commentCount={post.commentCount} />
          <CommentThread postId={post._id} commentCount={post.commentCount} />
        </>
      )}
    </div>
  );
};

export default PostPage;