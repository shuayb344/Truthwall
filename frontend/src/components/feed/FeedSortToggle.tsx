interface FeedSortToggleProps {
  activeSort: "latest" | "trending";
  onSortChange: (sort: "latest" | "trending") => void;
}

const FeedSortToggle = ({ activeSort, onSortChange }: FeedSortToggleProps) => {
  return (
    <div className="flex rounded-full bg-[#12121A] border border-[#2A2A3E] p-1">
      {(["latest", "trending"] as const).map((sort) => (
        <button
          key={sort}
          onClick={() => onSortChange(sort)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeSort === sort
              ? "bg-[#7C6FF7] text-white shadow-sm"
              : "text-[#A0A0B8] hover:text-[#EEEEF5]"
          }`}
        >
          {sort === "latest" ? "Latest" : "Trending"}
        </button>
      ))}
    </div>
  );
};

export default FeedSortToggle;
