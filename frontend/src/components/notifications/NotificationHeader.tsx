import { Bell, CheckCheck } from "lucide-react";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
  isMarkingAll: boolean;
}

const NotificationHeader = ({
  unreadCount,
  onMarkAllRead,
  isMarkingAll,
}: NotificationHeaderProps) => {
  return (
    <div className="sticky top-14 lg:top-0 z-30 bg-[#080808]/80 backdrop-blur-md border-b border-[#2A2A2A]/50">
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-[#F5F5F5]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-[#E03030] text-[10px] font-heading text-white leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
            <h1 className="text-xl font-heading text-[#F5F5F5]">Notifications</h1>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              disabled={isMarkingAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#E03030] hover:bg-[#E03030]/10 border border-[#E03030]/30 transition-all disabled:opacity-50"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationHeader;
