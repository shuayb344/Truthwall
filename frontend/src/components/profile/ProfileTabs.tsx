interface ProfileTabsProps {
  activeTab: "posts" | "bookmarks";
  onTabChange: (tab: "posts" | "bookmarks") => void;
}

const tabs = [
  { key: "posts" as const, label: "My Truths" },
  { key: "bookmarks" as const, label: "Bookmarks" },
];

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="flex items-center gap-0 border-b border-[#2A2A3E]/50 mb-5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative px-5 py-3 text-sm font-medium transition-all ${
              isActive
                ? "text-[#EEEEF5]"
                : "text-[#606078] hover:text-[#A0A0B8]"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7C6FF7] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
