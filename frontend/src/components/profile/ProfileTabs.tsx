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
    <div className="flex items-center gap-0 border-b border-[#2A2A2A]/50 mb-5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`relative px-5 py-3 text-sm font-medium transition-all ${
              isActive
                ? "text-[#F5F5F5]"
                : "text-[#555555] hover:text-[#999999]"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E03030] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
