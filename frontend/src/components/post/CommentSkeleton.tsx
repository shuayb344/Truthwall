const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex-shrink-0 mt-0.5" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-20 bg-[#1A1A1A] rounded" />
          <div className="h-2 w-12 bg-[#1A1A1A] rounded" />
        </div>

        <div className="bg-[#1A1A1A]/50 border border-[#2A2A2A]/30 rounded-xl px-4 py-3 space-y-2">
          <div className="h-3 w-full bg-[#1A1A1A] rounded" />
          <div className="h-3 w-3/4 bg-[#1A1A1A] rounded" />
        </div>

        <div className="flex items-center gap-4 mt-2 ml-1">
          <div className="h-3 w-8 bg-[#1A1A1A] rounded" />
          <div className="h-3 w-10 bg-[#1A1A1A] rounded" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
