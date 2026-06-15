const NotificationSkeleton = () => {
  return (
    <div className="flex items-start gap-3.5 px-5 py-4 animate-pulse border-b border-[#2A2A3E]/30">
      {/* Icon placeholder */}
      <div className="w-10 h-10 rounded-xl bg-[#1C1C28] flex-shrink-0" />

      {/* Content placeholders */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 w-4/5 bg-[#1C1C28] rounded" />
        <div className="h-3 w-24 bg-[#1C1C28] rounded" />
      </div>

      {/* Dot placeholder */}
      <div className="w-2.5 h-2.5 rounded-full bg-[#1C1C28] flex-shrink-0 mt-2" />
    </div>
  );
};

export default NotificationSkeleton;
