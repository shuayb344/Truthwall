import { useComments } from "@/hooks/usePost";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { Loader2, ChevronDown, MessageSquare } from "lucide-react";
import CommentSkeleton from "./CommentSkeleton";

interface CommentThreadProps {
  postId: string;
  commentCount: number;
}

const CommentThread = ({ postId, commentCount }: CommentThreadProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useComments(postId);

  const comments = data?.pages.flatMap((page) => page.comments) ?? [];

  // Nest comments
  const topLevelComments = comments.filter(c => !c.parentId);
  const repliesMap = comments.reduce((acc, comment) => {
    if (comment.parentId) {
      if (!acc[comment.parentId]) acc[comment.parentId] = [];
      acc[comment.parentId].push(comment);
    }
    return acc;
  }, {} as Record<string, typeof comments>);

  return (
    <div className="mt-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#7C6FF7]" />
          <h2 className="text-base font-bold text-[#EEEEF5]">
            Responses
          </h2>
          <span className="text-sm text-[#606078]">({commentCount})</span>
        </div>
        <div className="flex-1 h-px bg-[#2A2A3E]/50" />
      </div>

      {/* Comment input */}
      <div className="mb-6">
        <CommentInput postId={postId} />
      </div>



      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      ) : comments.length === 0 ? (

        <div className="text-center py-10">
          <MessageSquare className="w-8 h-8 text-[#2A2A3E] mx-auto mb-3" />
          <p className="text-sm text-[#606078]">No responses yet</p>
          <p className="text-xs text-[#505068] mt-1">Be the first to respond with empathy</p>
        </div>
      ) : (
        <div className="space-y-5">
          {topLevelComments.map((comment) => (
            <CommentItem 
              key={comment._id} 
              comment={comment} 
              replies={repliesMap[comment._id] || []}
            />
          ))}
        </div>
      )}


      {/* Load more */}
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1C1C28] border border-[#2A2A3E] text-sm font-medium text-[#A0A0B8] hover:text-[#EEEEF5] hover:border-[#3A3A4E] transition-all disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load more responses
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentThread;
