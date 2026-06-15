import type { Category } from "@/types";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "mental-health", label: "Mental Health" },
  { value: "relationships", label: "Relationships" },
  { value: "work", label: "Workplace" },
  { value: "family", label: "Family" },
  { value: "identity", label: "Identity" },
];

interface FeedCategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FeedCategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: FeedCategoryTabsProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
            activeCategory === cat.value
              ? "bg-[#E03030] text-white border-[#E03030]"
              : "bg-transparent text-[#999999] border-[#2A2A2A] hover:border-[#E03030]/50 hover:text-[#F5F5F5]"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default FeedCategoryTabs;
