import { BellOff } from "lucide-react";

const NotificationEmpty = () => {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#2A2A2A] flex items-center justify-center mb-4">
        <BellOff className="w-7 h-7 text-[#555555]" />
      </div>
      <p className="text-[#999999] mb-1 text-sm font-medium">
        No notifications yet
      </p>
      <p className="text-xs text-[#555555] max-w-[240px]">
        When someone reacts to or comments on your truths, you'll see it here
      </p>
    </div>
  );
};

export default NotificationEmpty;
