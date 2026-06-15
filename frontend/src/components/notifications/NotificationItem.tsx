import { useNavigate } from "react-router-dom";
import { Heart, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Notification } from "@/types";

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

const typeConfig = {
  reaction: {
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    borderColor: "border-rose-400/20",
  },
  comment: {
    icon: MessageSquare,
    color: "text-text-aliaslue-400",
    bg: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
};

const NotificationItem = ({ notification, onMarkRead }: NotificationItemProps) => {
  const navigate = useNavigate();
  const config = typeConfig[notification.type] || typeConfig.reaction;
  const Icon = config.icon;
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

  const handleClick = () => {
    if (!notification.read) {
      onMarkRead(notification._id);
    }
    navigate(`/post/${notification.postId}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-start gap-3.5 px-5 py-4 text-left transition-all hover:bg-[#1A1A1A]/50 border-b border-[#2A2A2A]/30 ${
        !notification.read ? "bg-[#E03030]/[0.03]" : ""
      }`}
    >
      {/* Type icon */}
      <div
        className={`w-10 h-10 rounded-xl ${config.bg} border ${config.borderColor} flex items-center justify-center flex-shrink-0 mt-0.5`}
      >
        <Icon className={`w-4.5 h-4.5 ${config.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-relaxed ${
            notification.read ? "text-[#999999]" : "text-[#F5F5F5]"
          }`}
        >
          {notification.message}
        </p>
        <p className="text-xs text-[#555555] mt-1">{timeAgo}</p>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <div className="w-2.5 h-2.5 rounded-full bg-[#E03030] flex-shrink-0 mt-2 shadow-lg shadow-[#E03030]/40" />
      )}
    </button>
  );
};

export default NotificationItem;
