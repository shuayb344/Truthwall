const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 animate-pulse">
      {/* Avatar skeleton */}
      <div className="w-8 h-8 rounded-full bg-[#1C1C28] flex-shrink-0 mt-0.5" />

      <div className="flex-1 min-w-0">
        {/* Header skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-20 bg-[#1C1C28] rounded" />
          <div className="h-2 w-12 bg-[#1C1C28] rounded" />
        </div>

        {/* Content bubble skeleton */}
        <div className="bg-[#1C1C28]/50 border border-[#2A2A3E]/30 rounded-xl px-4 py-3 space-y-2">
          <div className="h-3 w-full bg-[#1C1C28] rounded" />
          <div className="h-3 w-3/4 bg-[#1C1C28] rounded" />
        </div>

        {/* Actions skeleton */}
        <div className="flex items-center gap-4 mt-2 ml-1">
          <div className="h-3 w-8 bg-[#1C1C28] rounded" />
          <div className="h-3 w-10 bg-[#1C1C28] rounded" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
