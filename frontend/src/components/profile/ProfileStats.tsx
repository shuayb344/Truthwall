import type { ProfileStats } from "@/api/profileApi";

interface ProfileStatsProps {
  stats: ProfileStats["stats"];
}

const statItems = [
  { key: "posts", label: "Posts" },
  { key: "reactions", label: "Reactions" },
  { key: "bookmarks", label: "Bookmarks" },
] as const;

const ProfileStatsBar = ({ stats }: ProfileStatsProps) => {
  return (
    <div className="flex items-center gap-0 mb-6">
      {statItems.map((item, i) => (
        <div key={item.key} className="flex items-center">
          {i > 0 && (
            <div className="w-px h-8 bg-[#2A2A3E] mx-5" />
          )}
          <div className="text-center">
            <p className="text-lg font-bold text-[#EEEEF5]">
              {stats[item.key].toLocaleString()}
            </p>
            <p className="text-xs text-[#606078] mt-0.5">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStatsBar;
