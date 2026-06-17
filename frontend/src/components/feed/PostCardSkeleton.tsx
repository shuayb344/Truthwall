const PostCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] p-5 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#1A1A1A]" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 bg-[#1A1A1A] rounded" />
            <div className="h-2 w-16 bg-[#1A1A1A] rounded" />
          </div>
        </div>
        <div className="h-6 w-20 bg-[#1A1A1A] rounded-full" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-[#1A1A1A] rounded" />
        <div className="h-3 w-5/6 bg-[#1A1A1A] rounded" />
        <div className="h-3 w-4/6 bg-[#1A1A1A] rounded" />
      </div>

      {/* Reaction bar skeleton */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-7 w-24 bg-[#1A1A1A] rounded-full" />
        ))}
        <div className="h-7 w-14 bg-[#1A1A1A] rounded-full ml-auto" />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
