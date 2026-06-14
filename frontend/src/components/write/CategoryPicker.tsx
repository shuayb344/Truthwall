import type { Category } from "@/types";

const categories: { value: Category; label: string; color: string; bg: string; activeBg: string }[] = [
  { value: "mental-health", label: "Mental Health", color: "text-violet-400", bg: "bg-transparent border-[#2A2A3E] text-[#A0A0B8]", activeBg: "bg-violet-400/15 border-violet-400/30 text-violet-400" },
  { value: "relationships", label: "Relationships", color: "text-teal-400", bg: "bg-transparent border-[#2A2A3E] text-[#A0A0B8]", activeBg: "bg-teal-400/15 border-teal-400/30 text-teal-400" },
  { value: "work", label: "Workplace", color: "text-blue-400", bg: "bg-transparent border-[#2A2A3E] text-[#A0A0B8]", activeBg: "bg-blue-400/15 border-blue-400/30 text-blue-400" },
  { value: "family", label: "Family", color: "text-amber-400", bg: "bg-transparent border-[#2A2A3E] text-[#A0A0B8]", activeBg: "bg-amber-400/15 border-amber-400/30 text-amber-400" },
  { value: "identity", label: "Identity", color: "text-rose-400", bg: "bg-transparent border-[#2A2A3E] text-[#A0A0B8]", activeBg: "bg-rose-400/15 border-rose-400/30 text-rose-400" },
];

interface CategoryPickerProps {
  selected: Category | null;
  onChange: (category: Category) => void;
}

const CategoryPicker = ({ selected, onChange }: CategoryPickerProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#EEEEF5] mb-3">
        Category
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = selected === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isActive ? cat.activeBg : `${cat.bg} hover:border-[#3A3A4E] hover:text-[#EEEEF5]`
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPicker;
