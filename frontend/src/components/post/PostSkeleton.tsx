const SinglePostSkeleton = () => {
  return (
    <div className="rounded-2xl border border-[#2A2A3E] bg-[#12121A] p-6 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-4 w-16 bg-[#1C1C28] rounded mb-5" />

      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1C1C28]" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-[#1C1C28] rounded" />
            <div className="h-3 w-16 bg-[#1C1C28] rounded" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#1C1C28]" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-4 w-full bg-[#1C1C28] rounded" />
        <div className="h-4 w-[95%] bg-[#1C1C28] rounded" />
        <div className="h-4 w-[90%] bg-[#1C1C28] rounded" />
        <div className="h-4 w-[85%] bg-[#1C1C28] rounded" />
      </div>

      {/* Category skeleton */}
      <div className="h-6 w-24 bg-[#1C1C28] rounded-full mb-6" />

      {/* Reaction bar skeleton */}
      <div className="flex items-center gap-2 pt-5 border-t border-[#2A2A3E]/50">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-28 bg-[#1C1C28] rounded-full" />
        ))}
        <div className="h-8 w-14 bg-[#1C1C28] rounded-full ml-auto" />
        <div className="h-8 w-8 bg-[#1C1C28] rounded-full" />
      </div>
    </div>
  );
};

export default SinglePostSkeleton;
