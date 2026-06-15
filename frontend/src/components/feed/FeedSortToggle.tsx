interface FeedSortToggleProps {
  activeSort: "latest" | "trending";
  onSortChange: (sort: "latest" | "trending") => void;
}

const FeedSortToggle = ({ activeSort, onSortChange }: FeedSortToggleProps) => {
  return (
    <div className="flex rounded-full bg-[#111111] border border-[#2A2A2A] p-1">
      {(["latest", "trending"] as const).map((sort) => (
        <button
          key={sort}
          onClick={() => onSortChange(sort)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeSort === sort
              ? "bg-[#E03030] text-white shadow-sm"
              : "text-[#999999] hover:text-[#F5F5F5]"
          }`}
        >
          {sort === "latest" ? "Latest" : "Trending"}
        </button>
      ))}
    </div>
  );
};

export default FeedSortToggle;
