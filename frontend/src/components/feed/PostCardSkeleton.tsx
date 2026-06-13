const PostCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-[#2A2A3E] bg-[#12121A] p-5 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-28 bg-[#1C1C28] rounded" />
          <div className="h-3 w-14 bg-[#1C1C28] rounded" />
        </div>
        <div className="h-6 w-24 bg-[#1C1C28] rounded-full" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-[#1C1C28] rounded" />
        <div className="h-3 w-5/6 bg-[#1C1C28] rounded" />
        <div className="h-3 w-4/6 bg-[#1C1C28] rounded" />
      </div>

      {/* Reaction bar skeleton */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-7 w-24 bg-[#1C1C28] rounded-full" />
        ))}
        <div className="h-7 w-14 bg-[#1C1C28] rounded-full ml-auto" />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
