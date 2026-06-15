import { BellOff } from "lucide-react";

const NotificationEmpty = () => {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#12121A] border border-[#2A2A3E] flex items-center justify-center mb-4">
        <BellOff className="w-7 h-7 text-[#606078]" />
      </div>
      <p className="text-[#A0A0B8] mb-1 text-sm font-medium">
        No notifications yet
      </p>
      <p className="text-xs text-[#606078] max-w-[240px]">
        When someone reacts to or comments on your truths, you'll see it here
      </p>
    </div>
  );
};

export default NotificationEmpty;
