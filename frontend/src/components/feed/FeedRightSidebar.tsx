import { TrendingUp, ChevronRight } from "lucide-react";

interface TrendingItem {
  category: string;
  title: string;
  count: string;
}

const trendingItems: TrendingItem[] = [
  { category: "#Workplace", title: "The Sunday Scaries at 3 PM", count: "4.2k confessions" },
  { category: "#Relationships", title: "The art of letting go", count: "2.8k confessions" },
  { category: "#MentalHealth", title: "High-functioning burnout", count: "1.5k confessions" },
];

const categoryColors: Record<string, string> = {
  "#Workplace": "text-text-aliaslue-400",
  "#Relationships": "text-teal-400",
  "#MentalHealth": "text-violet-400",
  "#Family": "text-amber-400",
  "#Identity": "text-rose-400",
};

const popularCategories = [
  "#SelfImprovement",
  "#FirstDates",
  "#Grief",
  "#Success",
];

const FeedRightSidebar = () => {
  return (
    <aside className="hidden xl:block w-[280px] flex-shrink-0 sticky top-0 h-screen py-6 pl-4">
      {/* Trending Today */}
      <div className="bg-[#111111] rounded-2xl border border-[#2A2A2A] p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[#E03030]" />
          <h3 className="text-sm font-heading text-[#F5F5F5]">Trending Today</h3>
        </div>

        <div className="space-y-4">
          {trendingItems.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <p className={`text-[10px] font-medium uppercase tracking-wider ${categoryColors[item.category] || "text-[#555555]"
                }`}>
                In {item.category}
              </p>
              <p className="text-sm font-semibold text-[#F5F5F5] group-hover:text-[#E03030] transition-colors mt-0.5">
                {item.title}
              </p>
              <p className="text-xs text-[#555555] mt-0.5">{item.count}</p>
            </div>
          ))}
        </div>

        <button className="mt-4 text-sm text-[#E03030] hover:text-[#C42020] font-medium transition-colors">
          Show more
        </button>
      </div>

      {/* Popular Categories */}
      <div className="bg-[#111111] rounded-2xl border border-[#2A2A2A] p-5">
        <h3 className="text-sm font-heading text-[#F5F5F5] mb-4">Popular Categories</h3>
        <div className="space-y-1">
          {popularCategories.map((cat) => (
            <button
              key={cat}
              className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm text-[#999999] hover:text-[#F5F5F5] hover:bg-[#1A1A1A] transition-all group"
            >
              <span>{cat}</span>
              <ChevronRight className="w-4 h-4 text-[#555555] group-hover:text-[#E03030] transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-4 px-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#555555]">
          <a href="#" className="hover:text-[#999999] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#999999] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#999999] transition-colors">Cookie Policy</a>
        </div>
        <p className="text-[10px] text-[#555555] mt-2">© 2026 TruthWall Inc.</p>
      </div>
    </aside>
  );
};

export default FeedRightSidebar;
